const esprima = require('esprima')
const estraverse = require('estraverse')
const escodegen = require('escodegen')

const sourceCode = `function ast(){}`
// esprima 可以将源代码转化成一个抽象语法树
const astTree = esprima.parseModule(sourceCode)

// 用来遍历语法树上的所有节点，然后可以处理你关心的节点
// 遍历过程是一个深度优先的过程
let indent = 0
const padding = () => ' '.repeat(indent)
// 这里其实用了一个设计模式，访问器模式
estraverse.traverse(astTree, {
  enter(node) {
    console.log(padding() + node.type + '进入')
    indent += 2
  },
  leave(node) {
    console.log(padding() + node.type + '离开')
    indent -= 2
  }
})
