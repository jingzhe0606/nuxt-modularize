export default async function ({ store }) {
  const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

  let storeModuleWaitForRegister = {
    modules: {}
  }

  // TODO: IIFE for require file, but I don't know why. Without it, program will throw error
  void (function updateStore() {
    <% options.storePaths.forEach((path) => { %>
    resolveStoreModules(require('<%=options.relativeToModules(path)%>'), '<%=path%>')
    <% }) %>
    const { modules } = storeModuleWaitForRegister
    Object.keys(modules).forEach(moduleName => {
      store.registerModule(moduleName, modules[moduleName])
    })
  })()

  // copy form nuxt source code
  function resolveStoreModules(moduleData, filePath) {
    moduleData = moduleData.default || moduleData
    // Remove store src + extension (./foo/index.js -> foo/index)
    const filename = filePath.replace('\/<%=options.moduleStoreDir%>', '')
    const namespace = filename.replace(/\.(js|mjs|ts)$/, '')
    const namespaces = namespace.split('/')
    let moduleName = namespaces[namespaces.length - 1]

    moduleData = moduleName === 'state'
      ? normalizeState(moduleData, filePath)
      : normalizeModule(moduleData, filePath)

    // If src is a known Vuex property
    if (VUEX_PROPERTIES.includes(moduleName)) {
      const property = moduleName
      const storeModule = getStoreModule(storeModuleWaitForRegister, namespaces, { isProperty: true })

      // Replace state since it's a function
      mergeProperty(storeModule, moduleData, property)
      return
    }

    // If file is foo/index.js, it should be saved as foo
    const isIndexModule = (moduleName === 'index')
    if (isIndexModule) {
      namespaces.pop()
      moduleName = namespaces[namespaces.length - 1]
    }

    const storeModule = getStoreModule(storeModuleWaitForRegister, namespaces)

    for (const property of VUEX_PROPERTIES) {
      mergeProperty(storeModule, moduleData[property], property)
    }

    if (moduleData.namespaced === false) {
      delete storeModule.namespaced
    }
  }

  function normalizeModule(moduleData, filePath) {
    if (moduleData.state && typeof moduleData.state !== 'function') {
      console.warn(`'state' should be a method that returns an object in ${filePath}`)
      const state = Object.assign({}, moduleData.state)
      // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
      moduleData = Object.assign({}, moduleData, { state: () => state })
    }
    return moduleData
  }

  function normalizeState(moduleData, filePath) {
    if (typeof moduleData !== 'function') {
      console.warn(`${filePath} should export a method that returns an object`)
      const state = Object.assign({}, moduleData)
      return () => state
    }
    return normalizeModule(moduleData, filePath)
  }

  function getStoreModule(storeModule, namespaces, { isProperty = false } = {}) {
    // If ./mutations.js
    if (!namespaces.length || (isProperty && namespaces.length === 1)) {
      return storeModule
    }

    const namespace = namespaces.shift()

    storeModule.modules[namespace] = storeModule.modules[namespace] || {}
    storeModule.modules[namespace].namespaced = true
    storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

    return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
  }

  function mergeProperty(storeModule, moduleData, property) {
    if (!moduleData) return

    if (property === 'state') {
      storeModule.state = moduleData || storeModule.state
    } else {
      storeModule[property] = Object.assign({}, storeModule[property], moduleData)
    }
  }
}
