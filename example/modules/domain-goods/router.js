export default [
  {
    path: '/goods',
    component: './views/index.vue',
    name: 'goodsIndex',
    meta: {
      test: 'meta is ok'
    }
  },
  {
    path: '/goods/detail/:id',
    component: './views/goods/detail.vue',
    name: 'goods-detail'
  }
]
