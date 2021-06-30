#!/usr/bin/env node

const { red } = require("chalk");
const program = require("commander");

program
  .usage("[options] -i [info]")
  .option("-i, --info", "是否打印记录")
  .parse(process.argv);

const { getApp } = require("../webpack/utils/getConfig");
const appConfig = getApp(program.module || null, { env: "prod" });

if (!appConfig) {
  console.error(red("> 缺少 app 配置"));
  return;
}

const webpack = require("webpack");
const isInfo = program._optionValues?.info;

webpackConfig = require(`../webpack/build/webpack.prod.js`)({
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

    stats.hasErrors() && console.error(stats.toString({ colors: true, chunks: false }));

    console.log("\n> 构建异常 \n");
  } else {
    isInfo && console.warn(stats.toString({ colors: true, chunks: false }));

    console.log(`\n> 构建完成，耗时 ${Date.now() - buildStamp} ms`);
  }
});
