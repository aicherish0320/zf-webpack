const path = require('path')
const fs = require('fs').promises
const { resolveVue } = require('./utils')

function vuePlugin({ projectRoot, app }) {
  app.use(async (ctx, next) => {
    // 这个插件 只处理 vue 文件
    if (!ctx.path.endsWith('.vue')) {
      return await next()
    }
    const filePath = path.join(projectRoot, ctx.path)
    // 读取 App.vue 的文件内容
    const content = await fs.readFile(filePath, 'utf-8')
    // 我们要在 node 端编译 App.vue 模版
    const defaultExportRegexp = /export default/
    const { parse, compileTemplate } = require('@vue/compiler-sfc')
    const { descriptor } = parse(content)
    let targetCode = ``
    // 脚本
    if (descriptor.script) {
      let scriptContent = descriptor.script.content
      scriptContent = scriptContent.replace(
        defaultExportRegexp,
        `const _sfc_main=`
      )
      targetCode += scriptContent
    }
    // 模版
    if (descriptor.template) {
      let templateContent = descriptor.template.content
      const { code } = compileTemplate({ source: templateContent })
      targetCode += code
    }
    targetCode += `\n_sfc_main.render=render`
    targetCode += `\nexport default _sfc_main`

    ctx.type = 'js'
    ctx.body = targetCode
  })
}

exports.vuePlugin = vuePlugin
