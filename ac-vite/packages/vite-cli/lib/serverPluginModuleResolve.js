const fs = require('fs').promises
const { resolveVue } = require('./utils')
const moduleRegexp = /^\/@modules\//

// 在此中间件我们要能够正确返回 vue 模块的内容
function moduleResolvePlugin({ projectRoot, app }) {
  app.use(async (ctx, next) => {
    // vueResolved 是对象，key 模块名 值是模块的真实的绝对路径
    const vueResolved = resolveVue(projectRoot)
    // 如果是遇到重写的路径
    if (!moduleRegexp.test(ctx.path)) {
      return await next()
    }
    // path 是改写后的路径
    // 把 /@modules/vue -> vue
    const id = ctx.path.replace(moduleRegexp, '')
    // 响应的内容类型是 application/javascript
    ctx.type = 'js'
    // 读取模块内容 直接返回给浏览器了
    const content = await fs.readFile(vueResolved[id], 'utf-8')
    // 把模块内容返回给响应体，就结束响应了
    ctx.body = content
  })
}
exports.moduleResolvePlugin = moduleResolvePlugin
