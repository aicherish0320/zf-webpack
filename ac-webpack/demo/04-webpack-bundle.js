var modules = {
  './src/title.js': (module, exports, require) => {
    require.r(exports)
    require.d(exports, {
      age: () => age,
      default: () => __WEBPACK_DEFAULT_EXPORT__ // getter，就是一个读取器
    })
    const __WEBPACK_DEFAULT_EXPORT__ = 'title_name'
    const age = 'title_age'
  }
}

function require(moduleId) {
  var module = {
    exports: {}
  }

  modules[moduleId](module, module.exports, require)

  return module.exports
}

require.d = (exports, definition) => {
  for (var key in definition) {
    // 如果 exports 身上没有 key 属性
    if (require.o(definition, key) && !require.o(exports, key)) {
      Object.defineProperty(exports, key, {
        // exports.default = 'title_name'
        // exports.age= 'title_age'
        enumerable: true,
        get: definition[key]
      })
    }
  }
}
require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
require.r = (exports) => {
  if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
    // Object.prototype.toString.call(exports) = [object Module]
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
  }
  // exports.__esModule = true，如果一个 exports 对象它的 __esModule=true，说明它是 esModule
  Object.defineProperty(exports, '__esModule', { value: true })
}

var exports = {}
const title = require('./src/title.js')
console.log('name >>> ', title)
console.log('age >>> ', title.age)
