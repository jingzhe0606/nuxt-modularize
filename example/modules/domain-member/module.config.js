const setting = {
  path: '/member',
  resourceCode: 'member',
  resourceIcon: 'c3-member',
  resourceName: '会员管理',
  resourceType: 1
}

/**
 * @description 将页面配置转成资树形数据
 * @param {Object} setting 页面配置
 * @param {String} 模块顶层名称
 * @param {String} 所属应用前缀
 * @return {Object}
 */
const system = createRoute(setting, 'member')
export default [system]

export const Services = setting

function createRoute (data, code) {
  let route = {}
  if (data.path) {
    const { path, resourceName } = data
    route = {
      path,
      name: code,
      meta: {
        title: resourceName
      },
      component: './views',
      children: []
    }
    Object.keys(data).filter(key => typeof (data[key]) === 'object' && data[key].path).map((child) => {
      route.children.push(createRoute(data[child], child))
    })
  }
  return route
}
