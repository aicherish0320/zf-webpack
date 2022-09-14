# webpack 原理

## 预备知识

- `toStringTag`
  - `Symbol.toStringTag` 是一个内置 symbol，它通常作为对象的属性健使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签
  - 通常只有内置的 `Object.prototype.toString` 方法会去读取这个标签并把它包含在自己的返回值里

## 兼容性实现

- commonjs 加载 commonjs
- commonjs 加载 es6 modules
- es6 modules 加载 es6 modules
- es6 module 加载 commonjs

> CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用；CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

> 在 webpack 里一切皆模块，每一个文件都是一个模块；相互依赖的模块，组合在一起就是一个代码块

## webpack 懒加载，异步加载

- 1. 点击按钮
- 2. 加载包含额外代码块的模块定义的 JS 文件
- 3. JS 文件加载回来后 JS 脚本会执行
- 4. 把新的模块定义合并到老的模块定义上
- 5. 走正常的加载逻辑了，加载新的模块，让 Promise resolve，然后走 then
