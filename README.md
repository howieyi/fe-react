# fe-react

> - 基于 `webpack5` 构建；
> - 专注于 `react` 项目的初始化和构建的工具，基于模板快速生成新项目，并快速进入开发；
> - 为了更方便赚外快，哈哈哈

- [`cli` 命令行工具](#cli)：基于 react 的构建工具
- [`@iosecret/storage` 缓存处理](#storage)：对于 storage 的统一处理
- [`@iosecret/wechat` 微信生态开发](#wechat)：对于微信生态开发的统一处理

## [cli](./packages/cli/README.md)

> 提供统一构建服务，初始化脚手架服务

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

## [storage](./packages/storage/README.md)

> 提供本地 storage 统一操作，内部做了针对对象数据的解析与设置

### 安装

```bash
$ npm i @iosecret/storage
```

### 使用

```typescript
import {
  setLocal,
  getLocal,
  removeLocal,
  setSession,
  getSession,
  getSession,
} from '@iosecret/storage';

// localStorage 操作
setLocal(key, value);
getLocal(key);
removeLocal(key);

// sessionStorage 操作
setSession(key, value);
getSession(key);
removeSession(key);
```

## [wechat](./packages/wechat/README.md)

> 主要针对微信生态定制开发

- 使用

```typescript
import { webpageLogin, isWeChatBrowser, getQueryParam } from '@iosecret/wechat';

// 1. 校验是否在微信浏览器中
const isInWeChat = isWeChatBrowser();

// 2. 获取 url 中某个参数
const code = getQueryParam('code', window.location.search);

// 3. 微信网页授权
const code = webpageLogin('appId', true /* 是否静默登录*/, '重定向地址');
```
