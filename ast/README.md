# AST

- webpack 和 lint 等很多的工具和库的核心都是通过 Abstract Syntax Tree 抽象语法树这个概念来实现对代码的检查、分析等操作

## 抽象语法树的用途

- 代码语法的检查、代码风格检查、代码的格式化、代码的高粱、代码自动补全等等
- 代码混淆压缩
- 优化变更代码，改变代码结构使达到想要的结构
  - 代码打包工具 webpack

## 抽象语法树的定义

- 这些工具的原理都是通过 JavaScript Parser 把代码转化为一颗抽象语法树，这颗语法树定义了代码的结构，通过操纵这颗树

## JavaScript Parser

是将 JavaScript 源代码转化为抽象语法树的解析器

- esprima
- traceur
- acorn
- shift

## babel

- parse
- transform
- generate

实现 babel 插件的时候，有一些原则，尽可能的复用老节点，尽可以少操作
