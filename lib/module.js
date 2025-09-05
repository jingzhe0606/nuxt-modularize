const { resolve, join } = require('path')
const fg = require('fast-glob')
const { relativeTo } = require('@nuxt/utils')

// while hot reloading, file should reload too

function requireUncached (module) {
  delete require.cache[require.resolve(module)]
  return require(module)
}

const DIR = 'modules'

const treeToArray = (data, { parentId = null, level = 0, keyPath = '', children = 'children' } = {}, noChildren) => {
  let tmp = []
  data.forEach((item, index) => {
    const _path = keyPath ? `${keyPath}-${item.id}` : item.id
    const newItem = {
      ...item,
      _id: item.id,
      parentId,
      _path,
      _level: level
    }
    tmp.push({
      ...newItem,
      children: noChildren ? [] : item.children
    })
    if (newItem[children] && newItem[children].length > 0) {
      const res = treeToArray(
        newItem[children],
        {
          parentId: item.id,
          keyPath: _path,
          level: level + 1,
          children
        },
        noChildren
      )
      tmp = tmp.concat(res)
    }
  })
  return tmp
}

const configToRoutes = (data, prefix) => {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    let route = {}
    let routes = []
    const prefixPath = data.moduleCode ? `/${data.moduleCode}` : prefix
    Object.keys(data)
      .filter(key => typeof data[key] === 'object' && data[key].path)
      .map((child) => {
        routes.push(configToRoutes(data[child], prefixPath))
      })
    Object.keys(data)
      .filter(key => typeof data[key] === 'object' && data[key].type === 'mod')
      .map((child) => {
        routes = routes.concat(configToRoutes(data[child], prefixPath))
      })
    if (data.path) {
      route = {
        path: prefixPath ? `${prefixPath}${data.path}` : data.path,
        meta: {
          title: data.name
        },
        name: data.name,
        component: data.component ? data.component : `./views${data.path}`,
        children: routes
      }
    }
    return data.path ? route : routes
  } else {
    return []
  }
}

const getModuleRouter = (routerFileName, modulePath) => fg.sync(`*/${routerFileName}.{js,mjs,ts}`, {
  deep: 2,
  onlyFiles: true,
  cwd: modulePath
})

const getModuleStore = (storeDirName, modulePath) => fg.sync(`*/${storeDirName}/**/*.{js,mjs,ts}`, {
  onlyFiles: true,
  cwd: modulePath
})

// use file path to get esm file
const pathToEsFile = (path, modulePath) => {
  return requireUncached(resolve(modulePath, path)).default
}

const getModuleNameFromGlobPath = path => path.split('/')[0]

// from relative path to absolute path
const replaceComponentPath = function (router = [], modulePath, moduleName) {
  if (!Array.isArray(router)) {
    return []
  }

  for (let i = 0; i < router.length; i++) {
    const route = router[i]
    route.chunkName = route.chunkName || join(moduleName, route.component)
    route.chunkName = route.chunkName.replace(/\.(js|mjs|ts|vue)$/, '')
    if (process.platform === 'win32') {
      route.chunkName = route.chunkName.replace(/\\/g, '_')
    }
    route.component = resolve(modulePath, moduleName, route.component)
    if (route.children && route.children.length) {
      route.children = replaceComponentPath(route.children, modulePath, moduleName)
    }
  }

  return router
}

// 过滤需要编译的模块，如果没有传入指定要编译的模块，则编译所有模块
const filterModuleList = (target = [], source = []) => {
  if (!target.length) {
    return source
  }
  return source.filter((path) => {
    const moduleName = getModuleNameFromGlobPath(path)
    return (target.includes(moduleName))
  })
}

module.exports = function (moduleOptions) {
  const defaultOptions = {
    moduleDir: DIR,
    moduleRouterName: process.env.ROUTER_FILE || 'module.config',
    moduleStoreDir: this.options.dir.store,
    moduleList: process.env.MODULE_LIST || '',
    relativeToModules: (...arg) => {
      return relativeTo(this.options.buildDir, this.options.srcDir, DIR, ...arg)
    }
  }

  const options = {
    ...defaultOptions,
    ...moduleOptions
  }
  options.modulePath = resolve(this.options.srcDir, options.moduleDir)

  const moduleArray = options.moduleList ? options.moduleList.split(',') : []

  // watch files under src/modules
  this.options.build.watch.push(`${options.modulePath}/**/*`)

  // use function to create multiple instance
  const routerPaths = () => {
    const routes = getModuleRouter(options.moduleRouterName, options.modulePath)
    // according to moduleList to compiler file
    return filterModuleList(moduleArray, routes)
  }

  const storePaths = () => {
    const stores = getModuleStore(options.moduleStoreDir, options.modulePath)
    return filterModuleList(moduleArray, stores)
  }

  options.storePaths = storePaths()
  const moduleRouterCollection = () => routerPaths().reduce((router, path) => {
    const moduleName = getModuleNameFromGlobPath(path)
    const rawConfig = pathToEsFile(path, options.modulePath)
    const rawRouter = process.env.ROUTER_MODE === 'TREE' ? configToRoutes(rawConfig) : treeToArray(configToRoutes(rawConfig), {}, true)
    const treatRouter = replaceComponentPath(rawRouter, options.modulePath, moduleName)
    router = router.concat(treatRouter)
    return router
  }, [])

  // extend custom router
  this.extendRoutes((routes, resolve) => {
    routes = routes.concat(moduleRouterCollection())
    return routes
  })

  // register vuex store

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'modules-store.js',
    options
  })

  // add module webpack alias
  this.extendBuild((config) => {
    const alias = config.resolve.alias
    const moduleAlias = {}
    options.storePaths.forEach((path) => {
      const moduleName = getModuleNameFromGlobPath(path)
      moduleAlias[`^${moduleName}`] = resolve(options.modulePath, moduleName)
    })
    config.resolve.alias = Object.assign(moduleAlias, alias)
  })
}

module.exports.meta = require('../package.json')
