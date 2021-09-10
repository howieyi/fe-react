'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateRule =
  exports.generateTemplate =
  exports.getTemplateQuestionList =
    void 0;
const path_1 = require('path');
const fs_extra_1 = require('fs-extra');
const config_1 = require('./config');
/**
 * 重写文件内容
 *
 * @param {*} fromFile
 * @param {*} toFile
 * @param {*} formatter 格式化回调 data => string
 */
const transferFile = (fromFile, toFile, formatter = null) => {
  return new Promise((resolve, reject) => {
    if (!fs_extra_1.existsSync(fromFile)) {
      reject(new Error(`${fromFile} 不存在`));
      return;
    }
    fs_extra_1.readFile(fromFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      // formatter for data
      const replaceData =
        formatter && typeof formatter === 'function' ? formatter(data) : data;
      fs_extra_1.writeFile(toFile, replaceData, 'utf8', error => {
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
 * 获取模板列表
 *
 * @returns
 */
const getTemplateQuestionList = () => config_1.templateList.map(it => it.text);
exports.getTemplateQuestionList = getTemplateQuestionList;
/**
 * 获取模板目录别名
 *
 * @param text
 * @returns
 */
const getTemplateName = text => {
  const item = config_1.templateList.find(it => it.text === text);
  return item.name;
};
/**
 * 生成模板
 *
 * @param toPath
 * @param param
 */
const generateTemplate = (
  toPath,
  {
    name = 'web',
    version = '1.0.0',
    description = 'web',
    author = '水逆',
    template,
    port = '8081',
  },
) => {
  const templateKey = getTemplateName(template);
  if (!templateKey) throw new Error('💣 没有找到对应模板');
  // 是否 lerna 模板
  const isLernaTemplate = templateKey === 'lerna';
  const copyInDirs = ['iwr', 'commitlint', 'eslint', 'prettier', 'git'];
  const tempConfig = config_1.templateConfig.packages[templateKey];
  const fromRoot = path_1.join(__dirname, '../');
  const toRoot = path_1.join(toPath, name);
  // 生成目录不存在，则新建
  !fs_extra_1.existsSync(toRoot) && fs_extra_1.mkdirSync(toRoot);
  // 迁移模板代码
  const fromPkgPath = path_1.join(fromRoot, 'packages', tempConfig.path);
  fs_extra_1.copySync(fromPkgPath, toRoot);
  // 迁移依赖代码
  tempConfig.dependencies.forEach(it => {
    const dependPath = path_1.join(fromRoot, 'dependencies', it);
    if (copyInDirs.includes(it)) {
      // 生成规则到目录下
      fs_extra_1.copySync(dependPath, toRoot);
    } else {
      // 迁移配置依赖
      fs_extra_1.copySync(dependPath, path_1.join(toRoot, it));
    }
  });
  // 更新 package.json
  const packageJsonPath = path_1.join(toRoot, 'package.json');
  const toPackageJson = fs_extra_1.readJsonSync(packageJsonPath);
  if (!isLernaTemplate) {
    toPackageJson.name = name;
    toPackageJson.version = version;
  }
  toPackageJson.author = author;
  toPackageJson.description = description;
  // 更新 package.json
  fs_extra_1.writeJsonSync(packageJsonPath, toPackageJson, { spaces: 2 });
  // 更新配置文件端口
  const stcConfigFile = path_1.join(toRoot, 'iwr.config.js');
  fs_extra_1.existsSync(stcConfigFile) &&
    transferFile(stcConfigFile, stcConfigFile, data =>
      data.replace(/\{iwr-port\}/g, port),
    );
};
exports.generateTemplate = generateTemplate;
/**
 * 生成规则配置，并抛出相关依赖
 *
 * @param toPath
 * @param param
 * @returns
 */
const generateRule = (
  toPath,
  { isPrettier = false, isEslint = false, isCommitLint = false },
) => {
  return new Promise((resolve, reject) => {
    const files = [];
    const dependencies = [];
    if (!fs_extra_1.existsSync(toPath)) {
      reject(new Error('文件地址不存在'));
      return;
    }
    // 新建 hooks 相关目录
    if (isCommitLint || isEslint) {
      fs_extra_1.mkdirsSync(path_1.join(toPath, '.husky'));
      dependencies.push('husky');
    }
    if (isPrettier) {
      files.push(...config_1.ruleConfig.prettier.files);
      dependencies.push(...config_1.ruleConfig.prettier.dependencies);
    }
    if (isEslint) {
      files.push(...config_1.ruleConfig.eslint.files);
      dependencies.push(...config_1.ruleConfig.eslint.dependencies);
    }
    if (isCommitLint) {
      files.push(...config_1.ruleConfig.commitlint.files);
      dependencies.push(...config_1.ruleConfig.commitlint.dependencies);
    }
    // 生成规则文件到固定目录
    files.forEach(file => {
      const path = path_1.join(__dirname, '../dependencies/', file);
      const toFilePath = path_1.join(
        toPath,
        file.includes('husky') ? file : file.split('/').pop(),
      );
      if (!isPrettier && file.includes('.eslintrc.js')) {
        // 移除 prettier 相关配置
        transferFile(path, toFilePath, data =>
          data.replace(/, 'plugin:prettier\/recommended'/g, ''),
        );
      } else {
        const stats = fs_extra_1.statSync(path);
        // 校验文件类型，进行文件或者文件夹迁移
        stats.isDirectory()
          ? fs_extra_1.copySync(path, toFilePath)
          : fs_extra_1.copyFileSync(path, toFilePath);
      }
    });
    const packageFile = path_1.join(toPath, 'package.json');
    if (fs_extra_1.existsSync(packageFile)) {
      const lintStagedList = [];
      const packagesJson = fs_extra_1.readJsonSync(packageFile);
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
      fs_extra_1.writeJsonSync(packageFile, packagesJson, { spaces: 2 });
    }
    resolve(dependencies);
  });
};
exports.generateRule = generateRule;
