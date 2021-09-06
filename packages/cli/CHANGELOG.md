## v1.0.21

- 更新模板

## v1.0.18

- 升级模板；
- 修复控制台渐变运行时问题；

## v1.0.17

- 去除对模板获取的获取与解析

## v1.0.16

- `iwr create` 初始化工程模板统一迁移到 `@iosecret/template` 包中；
- `iwr rule` 生成 eslint/commitlint 规则配置文件统一迁移到 `@iosecret/template` 包中；

## v1.0.15

- 新增 `eslint` 常规 rules

## v1.0.13

- 修复 lerna 管理项目中的包依赖路径问题；

## v1.0.12

- reset cli scripts；
- add `iwr rule`；

## v1.0.11

- 修复 `resolveLoader` 路径问题

## v1.0.9

- 移除 `stylelint`

## v1.0.8

- `webpack-api-mocker` 升级为 `mocker-api`;
- 升级 `postcss-loader`;

## v1.0.7

- 增加 `antd-mobile`/`antd` 按需加载；
- 增加 `less` 的编译支持；

## v1.0.5

- 模板配置文件移除 `analyzerPort` 属性配置；
- `iwr prod -a 9999` 支持自定义包依赖分析端口，默认端口 8989；

## v1.0.4

- 修复 `clean-webpack-plugin` 升级引起的参数问题；

## v1.0.3

- 调整模板，统一采用 scss 来编写样式

## v1.0.2

- 修改初始化默认作者名称

## v1.0.1

- 完善 readme，发布到 npm

## v1.0.0

- 集成 cli 工具 `iwr`，主要为实现 `react 项目` 的构建;
- 实现 `iwr dev`：开发模式下构建；
- 实现 `iwr prod`：生产环境下打包；
- 实现 `iwr umd`：制作 umd 包；
- 实现 `iwr create`：快速初始化 `react 项目`;
- 定制 react 项目简易模板，以供初始化调用；
