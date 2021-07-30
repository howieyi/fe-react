const { red } = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackDevConfig = require(`../lib/build/webpack.dev.js`);
const { getApp } = require('../lib/utils/getConfig');

const iwrDev = program => {
  program
    .command('dev')
    .description('🍊 开发环境构建')
    .action(() => {
      const appConfig = getApp(program.module || null, { env: 'dev' });

      if (!appConfig) {
        console.error(red('> 缺少 app 配置'));
        return;
      }

      const webpackConfig = webpackDevConfig({
        ...appConfig,
      });

      try {
        const devServerConfig = webpackConfig.devServer;
        const server = new WebpackDevServer(
          webpack(webpackConfig),
          devServerConfig,
        );
        server.listen(devServerConfig.port, devServerConfig.host, err => {
          if (err) {
            throw err;
          }
        });
      } catch (error) {
        console.error(error);
        process.exit(-1);
      }
    });
};

module.exports = iwrDev;
