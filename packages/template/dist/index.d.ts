/** 生成模板入参定义 */
interface IGenerateTemplateProps {
  /** 项目名称 */
  name: string;
  /** 版本号 */
  version: string;
  /** 项目描述 */
  description: string;
  /** 项目监听端口 */
  port?: string;
  /** 项目模板 */
  template?: string;
}
/** 生成规则入参定义 */
interface IGenerateRuleProps {
  /** 是否进行格式化控制 */
  isPrettier?: boolean;
  /** 是否进行 eslint 语法检测 */
  isEslint?: boolean;
  /** 是否进行代码提交规则检测 */
  isCommitLint?: boolean;
}
/**
 * 获取模板列表
 *
 * @returns
 */
export declare const getTemplateQuestionList: () => string[];
/**
 * 生成模板
 *
 * @param toPath
 * @param param
 */
export declare const generateTemplate: (
  toPath: string,
  { name, version, description, template, port }: IGenerateTemplateProps,
) => void;
/**
 * 生成规则配置，并抛出相关依赖
 *
 * @param toPath
 * @param param
 * @returns
 */
export declare const generateRule: (
  toPath: string,
  { isPrettier, isEslint, isCommitLint }: IGenerateRuleProps,
) => Promise<string[]>;
export {};
