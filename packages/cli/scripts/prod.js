const webpackProdConfig = require(`../lib/build/webpack.prod.js`);
const webpack = require('webpack');

const { red } = require('chalk');
const { getApp } = require('../lib/utils/getConfig');

const iwrProd = program => {
  program
    .command('prod')
    .description('🍌 生产环境构建')
    .option('-i, --info', '是否打印记录')
    .option('-a, --analyzer <analyzerPort>', '是否启用依赖分析')
    .action(({ info, analyzer }) => {
      const appConfig = getApp(program.module || null, { env: 'prod' });

      if (!appConfig) {
        console.error(red('> 缺少 app 配置'));
        return;
      }

      const webpackConfig = webpackProdConfig({
        ...appConfig,
        analyzerPort: analyzer
          ? typeof +analyzer === 'number'
            ? analyzer
            : 8989
          : null,
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

module.exports = iwrProd;
