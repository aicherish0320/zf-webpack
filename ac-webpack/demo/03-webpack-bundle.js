// 模块定义
var modules = {
  // key 模块ID = 此模块相对于项目根目录的相对路径
  // 值 是一个函数定义 其实就是一个 commonjs 风格的函数
  './src/title.js': (module) => {
    module.exports = 'title'
  }
}
// 模块的缓存
var cache = {}
// 加载一个模块，并且返回模块的导出结果，并且把结果放到缓存中，下次加载直接取缓存结果就可以了
function require(moduleId) {
  // 获取缓存的模块
  var cachedModule = cache[moduleId]
  // 缓存里有值 直接返回
  if (cachedModule !== undefined) {
    return cachedModule.exports
  }
  //
  var module = (cache[moduleId] = {
    exports: {}
  })
  //
  modules[moduleId](module, module.exports, require)
  return module.exports
}
debugger
var exports = {}
const title = require('./src/title.js')
console.log('Hello >>> ', title)

// 1. webpack 打包后的文件长什么样子？
// 2. 打包后代理里模块是如何定义的？如何加载的？
