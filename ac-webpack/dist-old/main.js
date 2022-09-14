// 放置着所有的模块定义，key 模块 ID； 值是模块定义
var modules = {}
// 已经加载的模块的缓存
var cache = {}

function require(moduleId) {
  if (cache[moduleId]) {
    return cache[moduleId]
  } else {
    var module = (cache[moduleId] = { exports: {} })
    // 执行模块定义方法，给 module.exports 赋值，导出对象就是 module.exports
    modules[moduleId](module, module.exports, require)
    return module.exports
  }
}

// 模块的定义
require.m = modules
// 模块的缓存
require.c = cache

require.f = {}
require.p = ''
require.d = (exports, definition) => {
  for (var key in definition) {
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: definition[key]
    })
  }
}
require.r = (exports) => {
  Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
  })
  Object.defineProperty(exports, '__esModule', { value: true })
}
require.u = (chunkId) => chunkId + `.main.js`

require.l = (url) => {
  let script = document.createElement('script')
  script.src = url
  document.head.appendChild(script)
}
// 已经安装好或者加载中的代码块 0表示已经就绪的
var installedChunks = { main: 0 }

require.f.j = (chunkId, promises) => {
  var installedChunkData
  const promise = new Promise((resolve, reject) => {
    installedChunkData = installedChunks[chunkId] = [resolve, reject]
  })
  // 这个就是 jsonp 要加载的脚本的路径或者说名称
  promises.push((installedChunkData[2] = promise))

  var url = require.p + require.u(chunkId)

  require.l(url)
}

require.e = (chunkId) => {
  const promises = []

  require.f.j(chunkId, promises)

  return Promise.all(promises)
}

var webpackJsonpCallback = ([chunkIds, moreModules]) => {
  var chunkId,
    i = 0,
    resolves = []
  for (; i < chunkIds.length; i++) {
    chunkId = chunkIds[i]
    // 把 promise 的 resolve 方法取出放到了 resolves 数组中
    resolves.push(installedChunks[chunkId][0])
    // 表示此代码已经加载完成
    installedChunks[chunkId] = 0
  }
  for (const moduleId in moreModules) {
    require.m[moduleId] = moreModules[moduleId]
  }
  // 循环执行我们所有的 resolve 方法，让 promise 完成
  while (resolves.length) {
    resolves.shift()()
  }
}

// 定义一个代码块加载的全局变量，它的值默认是一个空数组
var chunkLoadingGlobal = (window['webpackChunk_2_bundle'] = [])
chunkLoadingGlobal.push = webpackJsonpCallback

let btn = document.getElementById('btn')
btn.addEventListener('click', () => {
  require
    .e('src_video_js')
    .then(require.bind(null, './src/video.js'))
    .then((result) => {
      console.log(result)
    })
})
