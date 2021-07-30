const ora = require('ora');
const { red } = require('chalk');
const { join } = require('path');
const { prompt } = require('inquirer');
const { exec, echo } = require('shelljs');
const { copyFolder } = require('../lib/utils/file');

const developPath = process.cwd();
const iwrPath = join(__dirname, '..');
const templatePathPrefix = 'template';

const iwrCreate = program => {
  program
    .command('create')
    .description('🍉 初始化工程')
    .action(() => {
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
          default: 'iwr',
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
          const spinner = ora(`🌰 init project start \n`);
          spinner.start();

          // 复制项目模板
          copyFolder(templatePath, toPath, options);
          spinner.text = '🌰 init project end';

          // 执行 npm i 脚本
          // install dependencies
          spinner.text = `🍉 install dependencies ... \n`;
          exec(`cd ${name} && npm i`, code => {
            spinner.text =
              code !== 0 ? '💣 install failed' : '🇨🇳 install success';
            setTimeout(() => {
              spinner.stop();
            }, 800);
          });
        })
        .catch(error => {
          echo(error.isTtyError ? `${red('>')} 当前环境暂不支持` : error);
        });
    });
};

module.exports = iwrCreate;
