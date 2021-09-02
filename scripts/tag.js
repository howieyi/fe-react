const { existsSync } = require('fs');
const { join } = require('path');
const { exec } = require('child_process');

// 解析脚本，规则 node tag.js --arg=name ---arg1=name2
// 目前仅接收 package 参数
const params = { package: '' };
process.argv.forEach(it => {
  if (it.indexOf('=') > -1) {
    const args = it.replace(/-*/, '').split('=');
    args[0] && (params[args[0]] = args[1]);
  }
});

const packageJsonPath = join(
  __dirname,
  `../packages/${params.package}/package.json`,
);

// 文件不存在则退出
if (!existsSync(packageJsonPath)) process.exit(-1);

const { version, name } = require(packageJsonPath);
// 默认标签重置
// 用作默认发布时候
exec(`git tag -d v${version} && git tag ${name}@${version}`);
