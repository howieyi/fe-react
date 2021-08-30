/** 模板列表 */
export const templateList = [
  { name: 'react', text: 'react javascript' },
  { name: 'react-ts', text: 'react typescript' },
];

/** 模板基本配置 */
export const templateConfig = {
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
export const ruleConfig = {
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
    files: ['rule/.eslintignore', 'rule/.eslintrc.js', '.husky/pre-commit'],
  },
  /** commitlint 相关配置依赖 */
  commitlint: {
    dependencies: ['@commitlint/cli', '@commitlint/config-conventional'],
    files: ['rule/commitlint.config.js', '.husky/commit-msg'],
  },
  /** 格式化相关配置依赖 */
  prettier: {
    dependencies: ['eslint-plugin-prettier', 'prettier'],
    files: ['rule/.prettierrc', 'rule/.prettierignore', '.vscode'],
  },
};
