# fe-react

> - 基于 `webpack5` 构建；
> - 专注于 `react` 项目的初始化和构建的工具，基于模板快速生成新项目，并快速进入开发；
> - 为了更方便赚外快，哈哈哈

- [`cli` 命令行工具](#cli)：基于 react 的构建工具；
- [`eslint-config-eslint-react`](#eslint)：基于 react typescript 的自有 eslint 规则整合方案；
- [`@iosecret/storage` 缓存处理](#storage)：对于 storage 的统一处理；
- [`@iosecret/wechat` 微信生态开发](#wechat)：对于微信生态开发的统一处理；
- [`@iosecret/service` 公共服务提供](#service)：对于公共服务的统一处理，比如请求、时间等；
- [`@iosecret/mui` h5 简易组件库](#mui)：简易组件集成，通用组件库没有或者小而美的组件功能；
- [`@iosecret/performance` 性能检测上报工具](#performance)：检测页面加载、超时资源、FP、FCP 等，并提供资源上报；

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
  _                 _   ___   ____  _____
 (_)_      ___ __  / | / _ \ |___ \|___ /
 | \ \ /\ / / '__| | || | | |  __) | |_ \
 | |\ V  V /| |    | || |_| | / __/ ___) |
 |_| \_/\_/ |_|    |_(_)___(_)_____|____/

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

## [eslint](./packages/eslint/README.md)

> 自定义通用 eslint 规则，整合常规 eslint 开发规则，外部方便引用和扩展
>
> 1. 基于 `airbnb`，`airbnb-typescript`；
> 2. 基于常规 `typescript` 规则；
> 3. 基于常规 `react` 规则；
> 4. 加入了使用中的一些非强制习惯规则；
> 5. 内置了 `prettier` 的规则监听以及依赖;
> 6. 内置了 `lint-stage` 相关的包依赖；
>
> 注：此规则最适合 react typescript 开发者，当然 javascript 也同样可以使用

### 安装

```bash
$ npm i eslint-config-iwr-react
```

### 使用

- `eslint` 配置文件继承规则

```javascript
// 在 .eslintrc 或者其他 eslint 配置文件中
module.exports = {
  extends: ['iwr-react'],

  // ...
};
```

### lint-staged 配合支持

> 内置了 lint-staged 相关的依赖支持

- 在工程 `package.json` 中配置 `lint-staged` 过滤规则

```json
{
  // ...
  "lint-staged": {
    "**/*.{ts,tsx,js,jsx}": ["prettier --write", "eslint --fix"]
  }
}
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

## [service](./packages/service/README.md)

> 针对公共服务提供

1. 公共请求

```typescript
import { request } from '@iosecret/servic';

// 1. 请求处理
// 前置处理
request.before = options => {
  options.method = options.method || 'POST';
};

// 返回解析
request.after = (data, resolve) => {
  // TODO 统一处理请求返回
  resolve(data);
};

// 通用请求
request({ url: '' }).then();
```

## [mui](./packages/mui/README.md)

> h5 简易 ui 组件

## Usage

```typescript
import { showToast } from '@iosecret/mui';

showToast('简易 toast');
```

## [performance](./packages/performance/README.md)

> 性能检测上报工具

## Usage

```typescript
import Per from '@iosecret/performance';

const per = new Per(2000);

// 1. 获取首次绘制时间点
per.getFPTime();

// 2. 获取首次内容绘制时间点（文本、图片（包含背景图）、非白色的canvas或SVG时）
per.getFCPTime();

// 3. 获取页面加载数据
per.getPageTime();

// 4. 获取资源加载超时列表数据
per.getResourceTime();

// 5. 定义数据上报规则
per.onTrace(data => trace(data));
```
