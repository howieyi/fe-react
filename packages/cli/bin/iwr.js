#!/usr/bin/env node

const program = require('commander');
const figlet = require('figlet');
const lolcat = require('@darkobits/lolcatjs');
const { version } = require('../package.json');

const iwrDev = require('../scripts/iwr-dev');
const iwrProd = require('../scripts/iwr-prod');
const iwrUmd = require('../scripts/iwr-umd');
const iwrCreate = require('../scripts/iwr-create');
const iwrRule = require('../scripts/iwr-rule');

// 渐变输出
const toLolcat = text => {
  const code = figlet.textSync(text);
  return lolcat.default.fromString(code);
};

// 开发环境构建
iwrDev(program);

// 生产环境构建
iwrProd(program);

// 公共包制作
iwrUmd(program);

// 初始化工程
iwrCreate(program);

// 规则生成器
iwrRule(program);

program
  .version(toLolcat(`iwr ${version}`))
  .usage(
    `  
  water create
  water dev
  water prod -i -a [analyzerPort]
  water umd -i
  water rule -o`,
  )
  .description(
    `Params:
  
  dev:
    -i 是否打印详细信息
  
  prod: 
    -i 是否打印详细信息
    -a [analyzerPort] 是否开启代码依赖分析（默认端口8989）

  umd:
    -i 是否打印详细信息
    
  rule:
    -o <output> 生成目录
    `,
  );

program.parse(process.argv);
