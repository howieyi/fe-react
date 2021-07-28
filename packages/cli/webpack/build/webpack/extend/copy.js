const { join } = require('path');
const { existsSync } = require('fs');
const { sync } = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 复制文件
module.exports = (copyPath, webpackConfig) => {
  const path = join(process.cwd(), copyPath);

  // 有文件可复制
  if (existsSync(path) && sync(join(path), '*')) {
    webpackConfig.plugins.push(
      // 转移公共文件
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path,
            to: '.',
            force: true,
          },
        ],
      }),
    );
  }
};
