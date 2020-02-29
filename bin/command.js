#!/usr/bin/env node

const path = require('path')
const fse = require('fs-extra')
const consola = require('consola')
const { NuxtCommand } = require('@nuxt/cli')
const prompts = require('prompts')

const templateSource = path.resolve(__dirname, '../lib/template')

NuxtCommand.run({
  name: 'command',
  description: 'generate new module directory',
  usage: 'command <moduleName>',
  options: {
    srcDir: {
      type: 'string',
      description: 'nuxt.config.js.srcDir',
      default: 'src/'
    },
    moduleDir: {
      type: 'string',
      description: 'module dir',
      default: 'modules/'
    }
  },
  async run ({ argv }) {
    let moduleName = argv._[0]
    const { srcDir, moduleDir } = argv
    // required a moduleName if no input
    if (!moduleName) {
      const response = await prompts({
        type: 'text',
        name: 'moduleName',
        message: 'enter a moduleName!'
      })

      moduleName = response.moduleName
    }

    const modulesDir = path.resolve(process.cwd(), srcDir, moduleDir)

    const moduleTargetPath = path.join(modulesDir, moduleName)

    // exit if folder is existed
    if (fse.existsSync(moduleTargetPath)) {
      return consola.error(new Error(`module ${moduleName} is existed!`))
    } else {
      consola.info('copying module template...')
      fse.copySync(templateSource, moduleTargetPath)
      consola.success(`module ${moduleName} generate success!`)
    }
  }
})
