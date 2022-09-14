/**
 * 实现一个 babel 插件
 * 把 es6 的箭头函数 变成 es5 的普通函数
 */

const core = require('@babel/core')
const types = require('babel-types')
const arrowPlugin = require('babel-plugin-transform-es2015-arrow-functions')

const sourceCode = `const sum = (a, b) => { return a + b }`

const targetCode = core.transform(sourceCode, {
  plugins: [arrowPlugin]
})

console.log('targetCode >>> ', targetCode.code)
