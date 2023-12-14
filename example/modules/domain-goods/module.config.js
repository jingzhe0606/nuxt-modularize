export default {
  name: '商品管理',
  type: 'mod', // mod、menupage、linkpage、fnc、component
  // moduleName: 'goods', // 可设置一个添加到每个路由的前缀,如果设置了前缀，则最终url为prefixPath+每个对象的path
  // terminal: 'admin',
  goods: {
    name: '商品管理',
    type: 'menupage',
    path: '/goods',
    detail: {
      name: '商品详情',
      type: 'linkpage',
      path: '/goods/detail'
    }
  }
}
