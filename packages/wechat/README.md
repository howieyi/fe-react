# @iosecret/wechat

> 主要针对微信生态定制开发

## 相关文档

- [微信网页登录](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

## 使用

```typescript
import { webpageLogin, isWeChatBrowser, getQueryParam } from '@iosecret/wechat';

// 1. 校验是否在微信浏览器中
const isInWeChat = isWeChatBrowser();

// 2. 获取 url 中某个参数
const code = getQueryParam('code', window.location.search);

// 3. 微信网页授权
const code = webpageLogin('appId', true /* 是否静默登录*/ , '重定向地址');
```