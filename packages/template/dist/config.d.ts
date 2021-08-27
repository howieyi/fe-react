/** 模板列表 */
export declare const templateList: {
  name: string;
  text: string;
}[];
/** 模板基本配置 */
export declare const templateConfig: {
  dependencies: {
    vscode: string;
    husky: string;
    rule: string;
  };
  packages: {
    react: {
      path: string;
      dependencies: string[];
    };
    'react-ts': {
      path: string;
      dependencies: string[];
    };
  };
};
/** eslint/commitlint 规则配置 */
export declare const ruleConfig: {
  /** eslint 相关配置依赖 */
  eslint: {
    dependencies: string[];
    files: string[];
  };
  /** commitlint 相关配置依赖 */
  commitlint: {
    dependencies: string[];
    files: string[];
  };
  /** 格式化相关配置依赖 */
  prettier: {
    dependencies: string[];
    files: string[];
  };
};
