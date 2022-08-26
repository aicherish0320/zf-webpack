/**
  配置文件是可以有层次结构 可以继承
  进行代码检查 需要把源代码转化成抽象语法树
 */
module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  env: {
    browser: true,
    node: true
  },
  // 启用的代码检查规则 和 各自的错误级别
  rules: {
    indent: 'off',
    quotes: ['error', 'single'], // 引号
    semi: ['error', 'never'], // 分号
    'no-console': 'off' // 禁止使用 console
  }
}
