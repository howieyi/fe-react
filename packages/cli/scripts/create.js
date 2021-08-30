const ora = require('ora');
const { red } = require('chalk');
const { prompt } = require('inquirer');
const { exec, echo } = require('shelljs');
const { getTemplateList, generateTemplate } = require('@iosecret/template');

const iwrCreate = program => {
  const templateList = getTemplateList();
  const templateMapping = {};
  const templateNames = [];

  templateList.forEach(it => {
    templateNames.push(it.text);
    templateMapping[it.text] = it.name;
  });

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
      choices: templateNames,
    },
  ];

  program
    .command('create')
    .description('🍉 初始化工程')
    .action(() => {
      const spinner = ora(`🌰 工程初始化中 \n`);

      prompt(questions)
        .then(options => {
          const { name, template } = options;

          spinner.start();

          // 复制项目模板
          generateTemplate(process.cwd(), {
            ...options,
            template: templateMapping[template],
          });

          spinner.text = '🌰 工程生成完成';

          // 执行 npm i 脚本
          spinner.text = `🍉 依赖安装中... \n`;
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
