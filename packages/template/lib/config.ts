/** 模板基本配置 */
export const templateConfig = {
  dependencies: {
    vscode: '.vscode',
    husky: '.husky',
    rules: 'rule',
  },
  packages: {
    h5: {
      path: 'react',
      dependencies: ['.vscode', '.husky', 'rules'],
    },
    'h5-bridge': {
      path: 'react-ts',
      dependencies: ['.vscode', '.husky', 'rules'],
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
