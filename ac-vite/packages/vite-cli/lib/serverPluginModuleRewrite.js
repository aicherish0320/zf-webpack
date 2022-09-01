const { parse } = require('es-module-lexer')
const MagicString = require('magic-string')
const { readBody } = require('./utils')

async function rewriteImports(content) {
  const magicString = new MagicString(content)
  const imports = await parse(content)
  if (imports && imports.length > 0) {
    const imports0 = imports[0]
    if (imports0.length > 0) {
      for (let i = 0; i < imports0.length; i++) {
        const { n, s, e } = imports0[i]
        // 如果开始 既不是 / 也不是 .
        if (/^[^\/\.]/.test(n)) {
          const rewriteModuleId = `/@modules/${n}`
          magicString.overwrite(s, e, rewriteModuleId)
        }
      }
    }
  }
  return magicString.toString()
}

function moduleRewritePlugin({ projectRoot, app }) {
  app.use(async (ctx, next) => {
    await next()
    // 如果有响应体，并且响应体的内容类型是 js
    if (ctx.body && ctx.response.is('js')) {
      const content = await readBody(ctx.body)
      const ret = await rewriteImports(content)
      ctx.body = ret
    }
  })
}

exports.moduleRewritePlugin = moduleRewritePlugin
