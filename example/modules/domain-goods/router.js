export default [
  {
    path: '/goods',
    component: './views',
    name: 'goodsIndex',
    meta: {
      test: 'meta is ok'
    }
  },
  {
    path: '/goods/detail/:id',
    component: './views/goods/detail',
    name: 'goods-detail'
  }
]
