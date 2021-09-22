# `eslint-config-iwr-react`

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

## 安装

```bash
$ npm i eslint-config-iwr-react
```

## 使用

- `eslint` 配置文件继承规则

```javascript
// 在 .eslintrc 或者其他 eslint 配置文件中
module.exports = {
  extends: ['iwr-react'],

  // ...
};
```

## lint-staged 配合支持

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
