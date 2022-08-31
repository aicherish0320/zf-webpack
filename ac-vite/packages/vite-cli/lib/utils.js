const { Readable } = require('stream')

async function readBody(stream) {
  if (stream instanceof Readable) {
    return new Promise((resolve, reject) => {
      let buffers = []
      // 当从流中读取到数据后
      stream.on('data', (chunk) => buffers.push(chunk))
      stream.on('end', () => resolve(Buffer.concat(buffers).toString()))
      stream.on('error', (error) => reject(error))
    })
  } else {
    return Promise.resolve(stream.toString())
  }
}

function resolveVue(projectRoot) {
  const path = require('path')
  const compilerPkgPath = path.resolve(
    projectRoot,
    '../../node_modules',
    '@vue/compiler-sfc/package.json'
  )
  const compilerPkg = require(compilerPkgPath)
  // 在 node.js 中编译模块的路径
  const compilerPath = path.join(
    path.dirname(compilerPkgPath),
    compilerPkg.main
  )
  // 1. 可以在浏览器 DOM 环境运行； 2. 其实就是没打包，import export，刚好可以在浏览器端运行
  // node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js

  const resolvePath = (moduleName) =>
    path.resolve(
      projectRoot,
      '../../node_modules',
      `@vue/${moduleName}/dist/${moduleName}.esm-bundler.js`
    )
  // 计算出来一个映射 key 模块名 值是此模块的 esm 版本在服务器或者说硬盘上的绝对路径
  return {
    compiler: compilerPath,
    '@vue/shared': resolvePath('shared'),
    '@vue/reactivity': resolvePath('reactivity'),
    '@vue/runtime-core': resolvePath('runtime-core'),
    vue: resolvePath('runtime-dom')
  }
}

exports.readBody = readBody
exports.resolveVue = resolveVue
