/* eslint import/no-extraneous-dependencies: 'off' */
const { sync } = require('glob');
const { join } = require('path');
const { copyFileSync } = require('fs');

// 迁移样式文件到 dist
const cssFiles = sync(join(__dirname, '../lib/**/**.css'));
cssFiles.forEach(file =>
  copyFileSync(file, file.replace(/\/lib\//gi, '/dist/')),
);
