#!/usr/bin/env node

const program = require("commander");
const version = require('../package').version;
const figlet = require('figlet');
const lolcat = require('@darkobits/lolcatjs');

const iwrCode = figlet.textSync(`iwr ${version}`);
// 渐变输出
const toLolcat = lolcat.default.fromString;

program
  .version(toLolcat(iwrCode))
  .usage(
    `  
  water create
  water dev
  water prod -i -a [analyzerPort]
  water umd -i`
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
    `
  )
  .command('create', '初始化项目')
  .command('dev', '开发环境构建')
  .command('prod', '生产环境构建')
  .command('umd', '公共包构建');

program.parse(process.argv);
