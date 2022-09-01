const Koa = require('koa')
const { serveStaticPlugin } = require('./serverPluginServeStatic')
const { moduleRewritePlugin } = require('./serverPluginModuleRewrite')
const { moduleResolvePlugin } = require('./serverPluginModuleResolve')
const { injectProcessPlugin } = require('./serverPluginInjectProcess')
const { vuePlugin } = require('./serverPluginVue')

/*
  1. 实现一个 Http 服务器，让客户端访问 index.html 能返回 index.html
  2. 当访问 /src/main.js 的时候，返回 main.js 的内容
*/

function createServer() {
  const app = new Koa()
  const projectRoot = process.cwd() // 当前的工作路径 current working directory

  const context = {
    app,
    projectRoot
  }

  app.use((ctx, next) => {
    Object.assign(ctx, context) // 把 context 上的 app 和 projectRoot 属性赋给 ctx
    return next()
  })
  // Koa 中的中间件是洋葱模型
  const resolvedPlugins = [
    injectProcessPlugin, // 往 html 中注入 process
    moduleRewritePlugin, // 重写模块路径
    moduleResolvePlugin, // 解析重写后的模块路径
    vuePlugin, // 解析 vue
    serveStaticPlugin // 返回静态文件的
  ]
  resolvedPlugins.forEach((plugin) => plugin(context))

  return app
}

createServer().listen(3331, () => console.log(3331))
