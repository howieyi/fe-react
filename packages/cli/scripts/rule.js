const { prompt } = require('inquirer');
const { join } = require('path');
const { green } = require('chalk');
const { exec, echo } = require('shelljs');
const { existsSync } = require('fs-extra');
const ora = require('ora');
const { generateRule } = require('@iosecret/template');

const questions = [
  {
    type: 'list',
    name: 'package',
    message: '包管理工具：',
    choices: ['yarn', 'npm'],
    default: 'yarn',
  },
  {
    type: 'confirm',
    name: 'isEslint',
    message: '是否启用 eslint：',
    default: 'Y',
  },
  {
    type: 'confirm',
    name: 'isCommitLint',
    message: '是否启用 commitlint：',
    default: 'Y',
  },
  {
    type: 'confirm',
    name: 'isPrettier',
    message: '是否启用 prettier：',
    default: 'Y',
  },
];

const iwrRule = program => {
  program
    .command('rule')
    .description('🌰 规则生成（eslint、commitlint、prettier)')
    .option('-o, --output <output>', '🦌 规则生成根路径')

    .action(({ output }) => {
      const root = output || process.cwd();
      const packageFile = join(root, 'package.json');

      // check project is existed
      if (!existsSync(packageFile)) {
        echo(`${green(`>`)} 请先初始化工程，执行如下脚本：`);
        echo(`${green(`>`)} iwr create \n`);
        process.exit(-1);
      }

      prompt(questions).then(
        ({ package, isEslint, isCommitLint, isPrettier }) => {
          generateRule(root, { isEslint, isCommitLint, isPrettier }).then(
            packages => {
              // install dependencies
              const spinner = ora(`🍉 安装依赖中... \n`);
              spinner.start();

              exec(
                `${package} ${package === 'npm' ? 'i' : 'add'} ${packages.join(
                  ' ',
                )} -D ${package === 'yarn' ? '-W' : ''}`,
                code => {
                  if (code !== 0) {
                    spinner.stop();
                    process.exit(-1);
                  }

                  spinner.text = '🍎 生成 eslint/commitlint 成功 \n';
                  setTimeout(() => {
                    spinner.stop();
                  }, 800);
                },
              );
            },
          );
        },
      );
    });
};

module.exports = iwrRule;
