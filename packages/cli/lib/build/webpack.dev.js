const chalk = require('chalk');
const { join } = require('path');
const { existsSync } = require('fs');
const os = require('os');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const apiMocker = require('mocker-api');
const webpackCoreConfig = require('./webpack/core');

const { getApp, errorEdit } = require('../utils/getConfig');

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iFace = interfaces[devName];
    for (let i = 0; i < iFace.length; i++) {
      const alias = iFace[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
  return '';
}

module.exports = ({ name = null } = {}) => {
  const app = getApp(name, { env: 'dev' });

  !app && errorEdit('缺少当前应用的配置');

  const { host = '0.0.0.0', port = 3001 } = app;

  // 开发模式禁用外链
  app.externals = {};

  return webpackCoreConfig(
    {
      ...app,
      isDev: true,
    },
    {
      devServer: {
        contentBase: app.buildPath,
        hot: true,
        host: host || '0.0.0.0',
        disableHostCheck: true,
        open: true,
        index: `index.html`,
        port,
        historyApiFallback: true,
        watchContentBase: true,
        watchOptions: {
          aggregateTimeout: 500,
          poll: false,
          ignored: /node_modules/,
        },
        compress: true,
        quiet: true,
        overlay: {
          warnings: false,
          errors: true,
        },
        clientLogLevel: 'warning',
        stats: 'errors-only',
        https: app.https || false,
        proxy: app.proxy,
        // mock api
        before: serve => {
          const apiPath = join(process.cwd(), 'api');
          existsSync(apiPath) && apiMocker(serve, apiPath);
        },
        after: () => {
          console.log(chalk.yellow(`\n> 构建目录 ${app.buildPath}`));
          console.log(chalk.green(`> 服务端口监听 ${port}`));
          console.log(chalk.yellow(`> 服务正在启动...\n`));
        },
      },

      plugins: [
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Project start at \n ${chalk.green(
                ` > http://127.0.0.1:${port}/`,
              )}\n ${chalk.green(` > http://${getIPAddress()}:${port}/`)}\n`,
            ],
          },

          onErrors: (severity, errors) => {
            // You can listen to errors transformed and prioritized by the plugin
            // severity can be 'error' or 'warning'
            console.error(chalk.red(errors.toString()));
          },

          // should the console be cleared between each compilation?
          // default is true
          clearConsole: true,

          // add formatters and transformers (see below)
          additionalFormatters: [],
          additionalTransformers: [],
        }),
      ],
    },
  );
};
