# Nuxt-Modularize

[![Build Status](https://badgen.net/travis/FEMessage/nuxt-micro-frontend/master)](https://travis-ci.com/FEMessage/nuxt-micro-frontend)
[![NPM Download](https://badgen.net/npm/dm/@femessage/nuxt-micro-frontend)](https://www.npmjs.com/package/@femessage/nuxt-micro-frontend)
[![NPM Version](https://badgen.net/npm/v/@femessage/nuxt-micro-frontend)](https://www.npmjs.com/package/@femessage/nuxt-micro-frontend)
[![NPM License](https://badgen.net/npm/license/@femessage/nuxt-micro-frontend)](https://github.com/FEMessage/nuxt-micro-frontend/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/nuxt-micro-frontend/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

**A simple way to separate nuxt as you want**

[中文](./README-zh.md)

[📖 **Release Notes**](./CHANGELOG.md)

## Features
Use this nuxt module you can:

- Split few independent module for development
- Build Nuxt on demand
- Composing a pages with Components friendly, such as dividing a page into some components in a same views directory
- Other development experience same as Nuxt

## Setup

1. Add `@zhangbintian/nuxt-modularize` dependency to your project

```bash
yarn add @zhangbintian/nuxt-modularize -D # or npm install @zhangbintian/nuxt-modularize -D
```

2. Add `@zhangbintian/nuxt-modularize` to the `modules` section of `nuxt.config.js`

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

## How To Use

[Docs](./docs/how-to-use.md)

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) FEMessage
