#!/usr/bin/env node

const program = require("commander");

program
  .usage("[options] -m [module]")
  .option("-m, --module [module]", "模块名称")
  .parse(process.argv);

const { getApp } = require("../webpack/utils/getConfig");
const appConfig = getApp(program.module || null, { env: "dev" });

if (!appConfig) {
  console.error(red("> 缺少 app 配置"));
  return;
}

const webpackConfig = require(`../webpack/build/webpack.dev.js`)({
  ...appConfig,
});

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

try {
  const devServerConfig = webpackConfig.devServer;
  const server = new WebpackDevServer(webpack(webpackConfig), devServerConfig);
  server.listen(devServerConfig.port, devServerConfig.host, err => {
    if (err) {
      throw err;
    }
  });
} catch (error) {
  console.error(error);
  process.exit(-1);
}
