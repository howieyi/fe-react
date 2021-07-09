# water-react

- 基于 `webpack5`
- 专注于 `react` 项目的初始化和构建的工具，基于模板快速生成新项目，并快速进入开发

## 安装

```bash
# 全局安装命令行工具
$ npm i -g iwr

# 文件权限不够时可能会安装异常，使用以下命令即可
$ sudo npm install -g --production --unsafe-perm=true --allow-root iwr
```

## 检测安装状态
- 控制台输入命令

```bash
$ iwr
```

- 控制台正常输出
```bash
→ iwr                                                                                                    [721a6b4]
Usage: iwr
  water create
  water dev
  water prod -i -a [analyzerPort]
  water umd -i

Params:

  dev:
    -i 是否打印详细信息

  prod:
    -i 是否打印详细信息
    -a [analyzerPort] 是否开启代码依赖分析（默认端口8989）

  umd:
    -i 是否打印详细信息


Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  create          初始化项目
  dev             开发环境构建
  prod            生产环境构建
  umd             公共包构建
  help [command]  display help for command
```

## 命令说明
- 初始化项目命令

```bash
$ iwr create
```

- 开发模式

```bash
# 开发模式构建
$ iwr dev
```

- 生产模式

```bash
# 生产环境构建
$ iwr prod

# 生产环境构建，并开启包分析 默认端口8989
$ iwr prod -a
# 自定义包分析端口
$ iwr prod -a 9999
```
