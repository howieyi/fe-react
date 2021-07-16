# `storage`

> 对本地 localStorage/sessionStorage 的操作

## Usage

```typescript
import { getLocal, setLocal, removeLocal, getSession, setSession, removeLocal } from '@iosecret/storage';

// localStorage 操作
setLocal(key, value);
getLocal(key);
removeLocal(key);

// sessionStorage 操作
setSession(key, value);
getSession(key);
removeSession(key);
```
