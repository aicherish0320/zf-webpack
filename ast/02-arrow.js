/**
 * 实现一个 babel 插件
 * 把 es6 的箭头函数 变成 es5 的普通函数
 */

const core = require('@babel/core')
const types = require('babel-types')
// const arrowPlugin = require('babel-plugin-transform-es2015-arrow-functions')

// 访问者 迭代器模式 iterator
const arrowPlugin = {
  visitor: {
    ArrowFunctionExpression(nodePath) {
      const node = nodePath.node
      hoistFunctionEnvironment(nodePath)
      node.type = 'FunctionExpression'
    }
  }
}

function hoistFunctionEnvironment(fnPath) {
  const thisEnvFn = fnPath.findParent((p) => {
    return (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram()
  })

  let thisPaths = getScopeInformation(fnPath)
  let thisBinding = '_this'
  let thisIdentifier = types.identifier(thisBinding)

  thisEnvFn.scope.push({
    type: 'VariableDeclaration',
    id: thisIdentifier,
    init: types.thisExpression()
  })

  if (thisPaths.length > 0) {
    thisPaths.forEach((thisPath) => {
      thisPath.replaceWith(thisIdentifier)
    })
  }
}

function getScopeInformation(fnPath) {
  let thisPaths = []
  fnPath.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath)
    }
  })
  return thisPaths
}

const sourceCode = `const sum = (a, b) => { return a + b; console.log(this) }`

const targetCode = core.transform(sourceCode, {
  plugins: [arrowPlugin]
})

console.log('targetCode >>> ', targetCode.code)
