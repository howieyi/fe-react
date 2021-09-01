# `@iosecret/service`

> 公共服务的处理

## Usage

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
