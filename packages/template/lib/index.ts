import { join } from 'path';
import {
  existsSync,
  copySync,
  readJsonSync,
  writeJsonSync,
  mkdirSync,
  readFile,
  writeFile,
  statSync,
  copyFileSync,
  mkdirsSync,
} from 'fs-extra';

import { templateConfig, ruleConfig } from './config';

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
  /** 项目模板相关 bridge */
  bridge?: string;
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
 * 重写文件内容
 *
 * @param {*} fromFile
 * @param {*} toFile
 * @param {*} formatter 格式化回调 data => string
 */
const transferFile = (
  fromFile: string,
  toFile: string,
  formatter: (data: string) => string = null,
) => {
  return new Promise((resolve, reject) => {
    if (!existsSync(fromFile)) {
      reject(new Error(`${fromFile} 不存在`));
      return;
    }

    readFile(fromFile, 'utf8', (err: any, data: any) => {
      if (err) {
        reject(err);
        return;
      }

      // formatter for data
      const replaceData =
        formatter && typeof formatter === 'function' ? formatter(data) : data;

      writeFile(toFile, replaceData, 'utf8', (error: any) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(true);
      });
    });
  });
};

/**
 * 生成模板
 *
 * @param toPath
 * @param param
 */
export const generateTemplate = (
  toPath: string,
  {
    name = 'web',
    version = '1.0.0',
    description = 'web',
    bridge = '无',
    port = '8081',
  }: IGenerateTemplateProps,
): void => {
  const tempKey = `h5${bridge === '无' ? '' : '-bridge'}`;
  const tempConfig: typeof templateConfig.packages.h5 =
    templateConfig.packages[tempKey];

  const fromRoot = join(__dirname, '../');
  const toRoot = join(toPath, name);

  // 生成目录不存在，则新建
  !existsSync(toRoot) && mkdirSync(toRoot);

  // 迁移模板代码
  const fromPkgPath = join(fromRoot, 'packages', tempConfig.path);
  copySync(fromPkgPath, toRoot);

  // 迁移依赖代码
  tempConfig.dependencies.forEach(it => {
    const dependPath = join(fromRoot, 'dependencies', it);
    if (it === 'rules') {
      // 生成规则到目录下
      copySync(dependPath, toRoot);
    } else {
      // 迁移配置依赖
      copySync(dependPath, join(toRoot, it));
    }
  });

  // 更新 package.json
  const packageJsonPath = join(toRoot, 'package.json');
  const toPackageJson = readJsonSync(packageJsonPath);
  toPackageJson.name = name;
  toPackageJson.version = version;
  toPackageJson.description = description;
  writeJsonSync(packageJsonPath, toPackageJson, { spaces: 2 });

  // 更新配置文件端口
  const stcConfigFile = join(toRoot, 'stc.config.js');
  transferFile(stcConfigFile, stcConfigFile, data =>
    data.replace(/\{t-port\}/g, port),
  );
};

/**
 * 生成规则配置，并抛出相关依赖
 *
 * @param toPath
 * @param param
 * @returns
 */
export const generateRule = (
  toPath: string,
  {
    isPrettier = false,
    isEslint = false,
    isCommitLint = false,
  }: IGenerateRuleProps,
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const files = [];
    const dependencies = [];

    if (!existsSync(toPath)) {
      reject(new Error('文件地址不存在'));
      return;
    }

    // 新建 hooks 相关目录
    if (isCommitLint || isEslint) {
      mkdirsSync(join(toPath, '.husky'));
      dependencies.push('husky');
    }

    if (isPrettier) {
      files.push(...ruleConfig.prettier.files);
      dependencies.push(...ruleConfig.prettier.dependencies);
    }

    if (isEslint) {
      files.push(...ruleConfig.eslint.files);
      dependencies.push(...ruleConfig.eslint.dependencies);

      // tsconfig 不存在即新建
      const tsconfigPath = join(toPath, 'tsconfig.json');
      !existsSync(tsconfigPath) &&
        copyFileSync(
          join(__dirname, '../dependencies/rules/tsconfig.json'),
          tsconfigPath,
        );
    }

    if (isCommitLint) {
      files.push(...ruleConfig.commitlint.files);
      dependencies.push(...ruleConfig.commitlint.dependencies);
    }

    // 生成规则文件到固定目录
    files.forEach(file => {
      const path = join(__dirname, '../dependencies/', file);
      const toFilePath = join(
        toPath,
        file.includes('husky') ? file : file.split('/').pop(),
      );

      if (!isPrettier && file.includes('.eslintrc.js')) {
        // 移除 prettier 相关配置
        transferFile(path, toFilePath, data =>
          data.replace(/, 'plugin:prettier\/recommended'/g, ''),
        );
      } else {
        const stats = statSync(path);
        // 校验文件类型，进行文件或者文件夹迁移
        stats.isDirectory()
          ? copySync(path, toFilePath)
          : copyFileSync(path, toFilePath);
      }
    });

    const packageFile = join(toPath, 'package.json');
    if (existsSync(packageFile)) {
      const lintStagedList = [];
      const packagesJson = readJsonSync(packageFile);

      packagesJson.scripts = packagesJson.scripts || {};
      packagesJson.scripts.prepare = 'husky install';

      isPrettier && lintStagedList.push('prettier --write');
      isEslint && lintStagedList.push('eslint --fix');

      if (lintStagedList.length) {
        packagesJson['lint-staged'] = {
          [`**/*.{ts,tsx,js,jsx}`]: lintStagedList,
        };
      }

      // 重写 package.json
      writeJsonSync(packageFile, packagesJson, { spaces: 2 });
    }

    resolve(dependencies);
  });
};
