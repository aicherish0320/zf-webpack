const Koa = require('koa')
const { serveStaticPlugin } = require('./serverPluginServeStatic')

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

  const resolvedPlugins = [serveStaticPlugin]
  resolvedPlugins.forEach((plugin) => plugin(context))

  return app
}

createServer().listen(3331, () => console.log(3331))
