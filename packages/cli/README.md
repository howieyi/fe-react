## cli

>
> 提供针对 react 生态的统一构建脚手架服务
> - 基础构建
> - 生产打包
> - 初始化项目
> - umd 打包服务
> 

### 安装

```bash
# 全局安装命令行工具
$ npm i -g iwr

# 文件权限不够时可能会安装异常，使用以下命令即可
$ sudo npm install -g --production --unsafe-perm=true --allow-root iwr
```

### 检测安装状态

- 控制台输入命令

```bash
$ iwr
```

- 控制台正常输出

```bash
→ iwr                                                                                                    [721a6b4]
Usage: iwr
  _                 _   ___   _ ____  
 (_)_      ___ __  / | / _ \ / | ___| 
 | \ \ /\ / / '__| | || | | || |___ \ 
 | |\ V  V /| |    | || |_| || |___) |
 |_| \_/\_/ |_|    |_(_)___(_)_|____/ 
                                      
Params:
  dev:
    -i 是否打印详细信息
  
  prod: 
    -i 是否打印详细信息
    -a <analyzerPort> 是否开启代码依赖分析（默认端口8989）

  umd:
    -i 是否打印详细信息
    
  rule:
    -o <output> 生成目录
    

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  dev             🍊 开发环境构建
  prod [options]  🍌 生产环境构建
  umd [options]   🍎 umd 包构建
  create          🍉 初始化工程
  rule [options]  🌰 规则生成（eslint、commitlint、prettier)
  help [command]  display help for command
```

### 命令说明

- 初始化工程

```bash
$ iwr create
```

- 开发模式构建

```bash
# 开发模式构建
$ iwr dev
```

- 生产模式构建

```bash
# 生产环境构建
$ iwr prod

# 生产环境构建，并开启包分析 默认端口8989
$ iwr prod -a
# 自定义包分析端口
$ iwr prod -a 9999
```

- umd 公共包构建

```bash
$ iwr umd
```


- eslint/commitlint 规则生成

```bash
$ iwr rule
# 制定路径生成
$ iwr rule -o <output>
```
