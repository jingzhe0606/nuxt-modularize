# Nuxt-Modularize

[![Build Status](https://badgen.net/travis/FEMessage/nuxt-modularize/master)](https://travis-ci.com/FEMessage/nuxt-modularize)
[![NPM Download](https://badgen.net/npm/dm/@zhangbintian/nuxt-modularize)](https://www.npmjs.com/package/@zhangbintian/nuxt-modularize)
[![NPM Version](https://badgen.net/npm/v/@zhangbintian/nuxt-modularize)](https://www.npmjs.com/package/@zhangbintian/nuxt-modularize)
[![NPM License](https://badgen.net/npm/license/@zhangbintian/nuxt-modularize)](https://github.com/FEMessage/nuxt-modularize/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/nuxt-modularize/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

**一键实现模块化开发 Nuxt**

[English](./README.md)

[📖 **发布日志**](./CHANGELOG.md)

## 功能特性
使用这个 nuxt module 你可以:

- 将一个项目划分为多个模块进行开发
- 按需构建生成需要的模块
- 更友好的组件化开发模式，例如你可以将一个页面分为几个模块，这些 vue 文件都可以放到同一个目录下
- 其他的开发体验与 Nuxt 一致

## 安装

1. 添加 `@zhangbintian/nuxt-modularize` 依赖到项目中

```bash
yarn add @zhangbintian/nuxt-modularize -D 
# or npm install @zhangbintian/nuxt-modularize -D
```

2. 添加 `@zhangbintian/nuxt-modularize` 到 `nuxt.config.js` 的 `modules` 属性中

```js
{
  modules: [
    // Simple usage
    '@zhangbintian/nuxt-modularize',

    // With options
    ['@zhangbintian/nuxt-modularize', { /* module options */ }]
  ]
}
```

## 如何使用

[文档](./docs/how-to-use.md)

# 开发

1. 克隆此仓库
2. 安装依赖 `yarn install` 或者 `npm install`
3. 运行 `npm run dev` 启动开发服务

## License

[MIT License](./LICENSE)

Copyright (c) FEMessage
