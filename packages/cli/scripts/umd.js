const { red } = require('chalk');
const webpack = require('webpack');

const webpackUmdConfig = require(`../lib/build/webpack.umd.js`);
const { getApp } = require('../lib/utils/getConfig');

const iwrUmd = program => {
  program
    .command('umd')
    .description('🍎 umd 包构建')
    .option('-i, --info', '是否打印记录')
    .action(({ info }) => {
      const appConfig = getApp(null, { env: 'umd' });

      if (!appConfig) {
        console.error(red('> 缺少 app 配置'));
        return;
      }

      const webpackConfig = webpackUmdConfig({
        ...appConfig,
      });

      const buildStamp = Date.now();

      webpack(webpackConfig, async (err, stats) => {
        if (err || stats.hasErrors()) {
          if (err) {
            console.error(red(err.stack || err));
            err.details && console.error(red(err.details));
            return;
          }

          stats.hasErrors() &&
            console.error(stats.toString({ colors: true, chunks: false }));

          console.log('\n> 构建异常 \n');
        } else {
          info && console.warn(stats.toString({ colors: true, chunks: false }));

          console.log(`\n> 构建完成，耗时 ${Date.now() - buildStamp} ms`);
        }
      });
    });
};

module.exports = iwrUmd;
