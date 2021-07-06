#!/usr/bin/env node

const { join } = require('path');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');

const { copyFolder } = require('../webpack/utils/file');

const developPath = process.cwd();
const iwrPath = join(__dirname, '..');
const templatePathPrefix = 'template';

prompt([
  {
    type: 'input',
    name: 'name',
    message: '项目名称(英文)：',
    default: 'water-ui',
  },
  {
    type: 'input',
    name: 'description',
    message: '项目描述：',
    default: 'react 项目',
  },
  {
    type: 'input',
    name: 'version',
    message: '项目初始版本：',
    default: '1.0.0',
  },
  {
    type: 'input',
    name: 'author',
    message: '作者：',
    default: '1.0.0',
  },
  {
    type: 'input',
    name: 'port',
    message: '启动端口',
    default: '8001',
  },
  {
    type: 'confirm',
    name: 'typescript',
    message: '使用 Typescript：',
    default: 'Y',
  },
])
  .then(options => {
    const { name, typescript } = options;

    const templateName = `react${typescript ? '-ts' : ''}`;
    const templatePath = join(iwrPath, templatePathPrefix, templateName);
    const toPath = join(developPath, name);

    // 复制项目模板
    copyFolder(templatePath, toPath, options);
    console.log(chalk.green('> ') + '初始化完成');

    // 执行 npm i 脚本
    exec(`cd ${name} && npm i`, (err, stdout, stderr) => {
      if (err || stderr) {
        console.log(err, stderr);
        process.exit(-1);
      } else {
        console.log(stdout);
      }
    });
  })
  .catch(error => {
    if (error.isTtyError) {
      console.error('当前环境暂不支持');
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
      console.error(error);
    }
  });
