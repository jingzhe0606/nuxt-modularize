# 模块化框架的使用方式

## 📦安装依赖
```shell
yarn add @femessage/nuxt-modularize -D
```

## 📖配置
```javascript
// 在 nuxt.config.js 中注册这个 nuxt module
module.exports = {
	modules: [
  	'@femessage/nuxt-modularize'
  ]
}
```

```json
// 在 package.json 中增加一个 script
{
	"scripts": {
  	"new": "nuxt module"
  }
}
```

## 🎩生成模块
```shell
# 在「终端」中输入命令行
yarn new <moduleName>
```

## 🛠目录的使用
```
src/
├── assets
├── components
├── const
├── layouts
├── middleware
├── modules                // 模块划分的文件夹
│   └── domain-goods       // 模块名 跨模块的复用，建议写到原本的nuxt目录中
│       ├── const          // 存放模块的常量文件
│       ├── components     // 通用组件
│       ├── container      // 页面复用的部分可以放到这里
│       ├── router.js      // 模块的路由，需要手动维护
│       ├── store          // vuex 状态管理相关文件，使用方式与 nuxt 一致
│       └── views          // vue 视图文件
├── pages
├── plugins
├── services
├── static
├── store
└── utils
```

### ⭐️模块命名

- 以功能模块、业务闭环划分都可以
- 尽量使用简单简短的一个单词描述

### 📜views 目录规范

- 用于存放 vue 文件
- views 下面创建页面文件夹，以页面路由命名，以一下几个页面为例
- 如果路由太长可以使用一级路由作为一个文件夹，加深目录的深度来换取更容易读的文件名

![image.png](https://i.loli.net/2020/02/18/4VuGdIjZQLzi5pT.png)
#### 规范 深度最多是 3
```
views
└── products 
    ├── sales-status          
    │   └── index.vue
    └── sales-status_new
    │   └── index.vue
    └── sales-status_detail
    │   └── index.vue
    └── sales-status_new
        └── index.vue
```

### 🚥路由表的使用

- 默认文件为 `src/modules/{moduleName}/router.js` 
- 只需要 `export default` 一个数组即可
- **component 只需要写一个相对路径即可，方便 ide 自动补全路径，增加效率。模块会自动处理文件路径的**
- 可以获取完整的 vue-router 功能，给路由增加自定义的属性，实现与路由关联的功能如面包屑
- name 属性：以 `-` 分隔，如 goods-detail, 反例 goodsIndex
- 路由的**必要参数**推荐使用动态路由，如 /goods/detail/:id id 是必须才能进入页面，其他辅助参数写在 query 即可

![image.png](https://i.loli.net/2020/02/18/gf6knEy1T4hKDWv.png)

### 🎛状态管理
> （后续也许会增加对 mapState 等辅助函数封装，减少重复输入模块名

- 文件目录与 nuxt store 一致
- 模块中的 store 默认都在 `${moduleName}` 的 store module 中

![image.png](https://i.loli.net/2020/02/18/IrVM4LoeZNtQAwW.png)

上图的 store 会注册两个 store module

- store/index.js => this.$store['domain-member']
- store/member/state.js => this.$store['domain-member'].member
- 使用方式

![image.png](https://i.loli.net/2020/02/18/IyNaPrJ5j3nmoCL.png)

- 结果

![image.png](https://i.loli.net/2020/02/18/ZwmyUXWkvBIQJDg.png)

### 🌈Webpack 路径别名

- 为了更方便的引入文件每个模块都注册了指向模块目录的路径别名
- `^ + {moduleName}` 

![image.png](https://i.loli.net/2020/02/18/gKTRnH3vdQliSOb.png)


### 🌚根据环境变量打包相应的模块

- 模块名以逗号 `,` 分隔即可，如不填入，默认打包全部模块
```
# 环境变量名
MODULE_LIST=domain-goods,domain-trade
```
![image.png](https://i.loli.net/2020/02/18/EsKG8obxYi4dXNS.png)

- 如果不传入环境变量，就会将所有模块打包，开发时为了快速编译，也可以通过环境变量，只运行特定的模块

![image.png](https://i.loli.net/2020/02/18/fxj3odyIasU8M7W.png)

