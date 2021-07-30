#!/usr/bin/env node

const program = require('commander');
const { version } = require('../package.json');

const iwrDev = require('../scripts/dev');
const iwrProd = require('../scripts/prod');
const iwrUmd = require('../scripts/umd');
const iwrCreate = require('../scripts/create');
const iwrRule = require('../scripts/rule');

const { textToLolcat } = require('../lib/utils/tool');

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
  .version(textToLolcat(`iwr ${version}`))
  .usage(
    `
    ${textToLolcat(`iwr ${version}`)}`,
  )
  .description(
    `Params:
  dev:
    -i 是否打印详细信息
  
  prod: 
    -i 是否打印详细信息
    -a <analyzerPort> 是否开启代码依赖分析（默认端口8989）

  umd:
    -i 是否打印详细信息
    
  rule:
    -o <output> 生成目录
    `,
  );

program.parse(process.argv);
