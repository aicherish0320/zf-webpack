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
