'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ruleConfig = exports.templateConfig = exports.templateList = void 0;
/** 模板列表 */
exports.templateList = [
  { name: 'react', text: 'react javascript' },
  { name: 'react-ts', text: 'react typescript' },
];
/** 模板基本配置 */
exports.templateConfig = {
  dependencies: {
    vscode: '.vscode',
    husky: '.husky',
    rule: 'rule',
  },
  packages: {
    react: {
      path: 'react',
      dependencies: ['.vscode', '.husky', 'rule'],
    },
    'react-ts': {
      path: 'react-ts',
      dependencies: ['.vscode', '.husky', 'rule'],
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
    files: ['rules/.eslintignore', 'rules/.eslintrc.js', '.husky/pre-commit'],
  },
  /** commitlint 相关配置依赖 */
  commitlint: {
    dependencies: ['@commitlint/cli', '@commitlint/config-conventional'],
    files: ['rules/commitlint.config.js', '.husky/commit-msg'],
  },
  /** 格式化相关配置依赖 */
  prettier: {
    dependencies: ['eslint-plugin-prettier', 'prettier'],
    files: ['rules/.prettierrc', 'rules/.prettierignore', '.vscode'],
  },
};
