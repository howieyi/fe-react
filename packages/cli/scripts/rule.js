const { prompt } = require('inquirer');
const { join } = require('path');
const { green } = require('chalk');
const { exec, echo } = require('shelljs');
const {
  existsSync,
  readJsonSync,
  copyFileSync,
  writeJsonSync,
} = require('fs-extra');
const ora = require('ora');
const { transferFile } = require('../lib/utils/fs');

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
    name: 'isEsLint',
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
        ({ package, isEsLint, isCommitLint, isPrettier }) => {
          // package dependencies
          const packages = ['husky'];
          // lint config files
          const files = [];
          let isTs = false;

          const tsconfigPath = join(process.cwd(), 'tsconfig.json');
          if (existsSync(tsconfigPath)) {
            isTs = true;
          }

          if (isEsLint) {
            // eslint react typescript
            packages.push('eslint', 'eslint-config-airbnb-base', 'lint-staged');
            files.push('.eslintignore', '.eslintrc.js');

            if (isTs) {
              packages.push(
                'eslint-config-airbnb-typescript',
                'eslint-config-prettier',
                'eslint-plugin-import',
                'eslint-plugin-jsx-a11y',
                'eslint-plugin-react',
                'eslint-plugin-react-hooks',
                'typescript',
                '@typescript-eslint/eslint-plugin',
              );
              files.push('tsconfig.eslint.json');
            }
          }

          if (isCommitLint) {
            // commit lint
            packages.push('@commitlint/cli', '@commitlint/config-conventional');
            files.push('commitlint.config.js');
          }

          // prettier formatter
          if (isPrettier) {
            packages.push('eslint-plugin-prettier', 'prettier');
            files.push('.prettierrc');
          }

          // install dependencies
          const spinner = ora(`🍉 install dependencies ... \n`);
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

              // lint scripts
              const lintStagedList = ['git add .'];
              // package.json
              const packagesJson = readJsonSync(packageFile);

              packagesJson.scripts = packagesJson.scripts || {};
              packagesJson.scripts.prepare = 'husky install';
              isPrettier && lintStagedList.push('prettier --write');
              lintStagedList.push('eslint --fix');
              packagesJson['lint-staged'] = {
                [`**/*.{${isTs ? 'ts,tsx,' : ''}js,jsx}`]: lintStagedList,
              };

              if (isTs) {
                // tsconfig.json is existed
                // update tsconfig.json extend
                const tslintJson = readJsonSync(tsconfigPath);
                tslintJson.extends = './tsconfig.eslint.json';
                writeJsonSync(tsconfigPath, tslintJson, { spaces: 2 });
              }

              // rewrite package.json
              writeJsonSync(packageFile, packagesJson, { spaces: 2 });

              const rulePath = join(__dirname, '../lib/config/rule/');

              // generate config
              files.forEach(file => {
                const fromFile = join(rulePath, file);
                const toFile = join(root, file);

                if (!isPrettier && file.includes('.eslintrc.js')) {
                  // remove prettier config
                  transferFile(fromFile, toFile, data =>
                    data.replace(/, 'plugin:prettier\/recommended'/g, ''),
                  );
                } else {
                  // transfer file
                  copyFileSync(fromFile, toFile);
                }
              });

              if (!existsSync(join(root, '.git'))) {
                exec(`git init`);
              }

              // husky init
              exec(`npx husky install`, huskyCode => {
                if (huskyCode !== 0) {
                  spinner.stop();
                  process.exit(-1);
                }

                const huskyPath = join(process.cwd(), './.husky/');

                // git hooks: pre-commit
                isEsLint &&
                  copyFileSync(
                    join(rulePath, 'pre-commit'),
                    join(huskyPath, 'pre-commit'),
                  );

                // git hooks: commit-msg
                isCommitLint &&
                  copyFileSync(
                    join(rulePath, 'commit-msg'),
                    join(huskyPath, 'commit-msg'),
                  );
              });

              spinner.text = '🍎 init rule success \n';
              setTimeout(() => {
                spinner.stop();
              }, 800);
            },
          );
        },
      );
    });
};

module.exports = iwrRule;
