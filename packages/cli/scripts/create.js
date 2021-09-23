const ora = require('ora');
const { join } = require('path');
const { red } = require('chalk');
const { prompt } = require('inquirer');
const { exec, echo } = require('shelljs');
const {
  getTemplateQuestionList,
  generateTemplate,
} = require('@iosecret/template');
const { existsSync, readJsonSync, writeJsonSync } = require('fs-extra');
const iwrVersion = require('../package.json').version;

const iwrCreate = program => {
  const templateList = getTemplateQuestionList();

  const questions = [
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
      type: 'list',
      name: 'template',
      message: '选择模板：',
      choices: templateList,
      default: templateList[0],
    },
  ];

  program
    .command('create')
    .description('🍉 初始化工程')
    .action(() => {
      const spinner = ora('🌰 工程初始化中 \n');

      prompt(questions)
        .then(options => {
          const { name } = options;

          spinner.start();

          // 复制项目模板
          generateTemplate(process.cwd(), options);

          // 更新 iwr 版本到最新
          const packageJson = join(process.cwd(), `${name}/package.json`);
          if (existsSync(packageJson)) {
            const json = readJsonSync(packageJson);
            json.devDependencies.iwr = `^${iwrVersion}`;
            writeJsonSync(packageJson, json, { spaces: 2 });
          }

          spinner.text = '🌰 工程生成完成';

          // 执行 npm i 脚本
          spinner.text = '🍉 依赖安装中... \n';
          exec(`cd ${name} && npm i`, code => {
            spinner.text = code !== 0 ? '💣 依赖安装失败' : '🇨🇳 依赖安装成功';
            setTimeout(() => {
              spinner.stop();
            }, 800);
          });
        })
        .catch(error => {
          spinner.stop();
          echo(error.isTtyError ? `${red('>')} 当前环境暂不支持` : error);
        });
    });
};

module.exports = iwrCreate;
