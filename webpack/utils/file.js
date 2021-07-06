const { readdirSync, readFile, writeFile, createReadStream, createWriteStream, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

// 忽略文件
const ignoreFiles = ['node_modules', '.DS_Store', 'dist', 'yarn.lock', 'package-lock.json'];
// 需要替换模板文字的文件
const replaceFiles = ['iwr.config.js', 'package.json'];

const handleError = err => {
  if (err) return console.log(err);
};

/**
 * 替换文件参数
 *
 * @param {*} fromFile
 * @param {*} toFile
 * @param {*} options
 * @returns
 */
const replaceArgsFile = (fromFile, toFile, options) => {
  if (!options) return;

  readFile(fromFile, 'utf8', function (err, data) {
    if (err) {
      return handleError(err);
    }
    const result = data
      .replace(/\{iwr-name\}/g, options.name)
      .replace(/\{iwr-version\}/g, options.version)
      .replace(/\{iwr-author\}/g, options.author)
      .replace(/\{iwr-port\}/g, options.port)
      .replace(/\{iwr-description\}/g, options.description);

    writeFile(toFile, result, 'utf8', handleError);
  });
};

/**
 * 复制文件夹
 *
 * @param {*} fromPath 源路径
 * @param {*} toPath 目的路径
 */
const copyFolder = (fromPath, toPath, options) => {
  if (!existsSync(fromPath)) return;

  // 不存在目的路径，则新建
  !existsSync(toPath) && mkdirSync(toPath);

  const files = readdirSync(fromPath, { withFileTypes: true });

  for (let file of files) {
    if (ignoreFiles.includes(file.name)) continue;

    const fromFilePath = join(fromPath, file.name);
    const toFilePath = join(toPath, file.name);

    if (file.isFile()) {
      if (replaceFiles.includes(file.name)) {
        // 替换内容读写
        replaceArgsFile(fromFilePath, toFilePath, options);
      } else {
        // 复制
        const reader = createReadStream(fromFilePath);
        const writer = createWriteStream(toFilePath);
        reader.pipe(writer);
      }
    } else {
      copyFolder(fromFilePath, toFilePath);
    }
  }
};

module.exports = {
  copyFolder,
};
