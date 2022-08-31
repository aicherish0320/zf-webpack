const MagicString = require('magic-string')
// const magicString = new MagicString(`export var name = 'aic'`)
// console.log(magicString.snip(0, 6).toString())
// console.log(magicString.remove(0, 7).toString())

const { parse } = require('es-module-lexer')

const code = `import { createApp } from 'vue';`

;(async function () {
  const imports = await parse(code)
  const { n, s, e } = imports[0][0]
  const magicString = new MagicString(code)
  const id = `@modules/${n}`
  const ret = magicString.overwrite(s, e, id).toString()
  console.log('ret >>> ', ret)
  // [ { n: 'vue', s: 27, e: 30, ss: 0, se: 31, d: -1, a: -1 } ]
  // console.log('imports >>> ', imports[0])
})()
