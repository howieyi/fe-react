'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ruleConfig = exports.templateConfig = exports.templateList = void 0;
/** 模板列表 */
exports.templateList = [
  { name: 'lerna', text: 'lerna 模板' },
  { name: 'react', text: 'react js 模板' },
  { name: 'react-rule', text: 'react js 模板（带lint规则）' },
  { name: 'react-ts', text: 'react ts 模板' },
  { name: 'react-ts-rule', text: 'react ts 模板（带lint规则）' },
];
/** 模板基本配置 */
exports.templateConfig = {
  dependencies: {
    vscode: '.vscode',
    husky: '.husky',
    rule: 'rule',
  },
  packages: {
    lerna: {
      path: 'lerna',
      dependencies: [
        '.vscode',
        '.husky',
        'commitlint',
        'eslint',
        'prettier',
        'git',
      ],
    },
    react: { path: 'react', dependencies: ['iwr', 'git'] },
    'react-ts': { path: 'react-ts', dependencies: ['iwr', 'git'] },
    'react-rule': {
      path: 'react-rule',
      dependencies: [
        '.vscode',
        '.husky',
        'iwr',
        'commitlint',
        'eslint',
        'prettier',
        'git',
      ],
    },
    'react-ts-rule': {
      path: 'react-ts-rule',
      dependencies: [
        '.vscode',
        '.husky',
        'iwr',
        'commitlint',
        'eslint',
        'prettier',
        'git',
      ],
    },
  },
};
/** eslint/commitlint 规则配置 */
exports.ruleConfig = {
  /** eslint 相关配置依赖 */
  eslint: {
    dependencies: [
      'eslint',
      'eslint-config-airbnb-base',
      'lint-staged',
      'eslint-config-airbnb-typescript',
      'eslint-config-prettier',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-import-resolver-typescript',
      'typescript',
      '@typescript-eslint/eslint-plugin',
    ],
    files: ['eslint/.eslintignore', 'eslint/.eslintrc.js', '.husky/pre-commit'],
  },
  /** commitlint 相关配置依赖 */
  commitlint: {
    dependencies: ['@commitlint/cli', '@commitlint/config-conventional'],
    files: ['commitlint/commitlint.config.js', '.husky/commit-msg'],
  },
  /** 格式化相关配置依赖 */
  prettier: {
    dependencies: ['eslint-plugin-prettier', 'prettier'],
    files: ['prettier/.prettierrc', 'prettier/.prettierignore', '.vscode'],
  },
};
