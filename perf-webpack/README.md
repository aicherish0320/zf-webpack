# webpack 性能优化

- 如何配置和启动项目
- 如何进行数据性能分析
- 编译时间的优化
  - 减少要处理的文件
  - 缩小查找范围
    - `extensions`
      - 指定 `extensions` 之后可以不用在 require 或是 import 的时候加文件扩展名
      - 查找的时候会依次尝试添加扩展名进行匹配
    - `alias`
      - 配置别名可以加快 webpack 查找模块的速度
      - 每当引入 Bootstrap 模块的时候，它会直接引入 Bootstrap，而不需要从 node_modules 文件夹中按模块的查找规则查找
    - `modules`
      - 对于直接声明依赖名的模块，webpack 会使用类似 Node.js 一样进行路径搜索，搜索 node_modules 目录
      - 如果可以确定项目内所有的第三方依赖模块都是在项目根目录下的 node_modules 中的话可以直接指定
      - 默认配置
    - `mainFields`
      - 默认情况下 package.json 文件则按照文件中 main 字段的文件名来查找文件
    - `mainFiles`
      - 当前目录下没有 package.json 文件时，我们说会默认使用目录下的 index.js 文件
    - `oneOf`
      - 每个文件对于 rules 中的所有规则都会遍历一边，如果使用 oneOf 就可以解决该问题，只能匹配一个即可退出
      - 在 oneOf 中不能两个配置处理同一种类型文件
    - `external`
      - 如果我们想引用一个库，但是又不想让 webpack 打包，并且又不影响我们在程序中一 CMD、AMD 或者 window/global 全局等方式进行使用，那就可以配置 external
    - noParse
      - `module.noParse` 字段，可以用于配置哪些模块文件的内容不需要进行解析
      - 不需要解析依赖的第三方大型类库，可以通过这个字段来配置，以提高整体的构建速度
      - 使用 `noParse`进行忽略的模块文件中不能使用 import require 等语法
    - `ignore-plugin`
      - 用于忽略某些特定的模块，让 webpack 不要把这些指定的模块打包进行，手动引入
    - `thread-loader` 多进程
      - 把 thread-loader 放置在其他 loader 之前，放置在这个 loader 之后的 loader，就会在一个单独的 worker 池中运行
    - 利用缓存
      - 利用缓存可以提升重复构建的速度
      - babel-loader,babel 在转以 js 文件过程中消耗性能非常高，将 babel-loader 执行的结果缓存起来，当重新打包构建时会尝试读取缓存，从而提高打包构建速度，降低消耗
      - cache-loader，在一些性能开销较大的 cache-loader 之前添加此 loader，可以将结果缓存到磁盘中
      - hard-source-webpack-plugin
        - 为模块提供了中间缓存
        - webpack5 已经自带了
- 编译体积的优化
  - 压缩 JS、CSS、HTML 和 图片
    - `optimize-css-assets-webpack-plugin`，是一个优化和压缩 CSS 资源的插件
    - `terser-webpack-plugin`，是一个优化和压缩 JS 资源的插件
    - `image-webpack-loader`，可以帮助我们对图片进行压缩和优化
  - tree-shaking
- 如何运行的更快

  - 代码分割
    - 对于大的 Web 应用来讲，将所有的代码都放在一个文件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被用到
    - webpack 有一个功能就是将你的代码库分割成 chunks 语快，当代码运行到需要它们的时候再进行加载
  - 入口点分割
    - entry points: 入口文件设置的时候可以配置
    - 不够灵活，并不能将核心应用程序逻辑进行动态拆分代码
  - 懒加载
    - 用户当前需要用什么功能就只加载这个功能对应的代码，也就是所谓的按需加载，在给单页应用作按需加载优化时，一般采用以下原则
      - 对网站功能进行划分，每一类一个 chunk
      - 对于首次打开页面需要的功能直接加载，尽快展示给用户，某些依赖大量代码的功能点可以按需加载
      - 被分割出去的代码需要一个按需加载的时机
  - prefetch
    - 使用预先拉取，你表示该模块可能以后会用到，浏览器会在空闲的时候下载该模块
    - prefetch 的作用是告诉浏览器未来可能会使用到的某个资源，浏览器就会在闲时去加载对应的资源，若能预测到用户的行为，比如懒加载，点击到其他页面等则相当于提前预加载了需要的资源
    - 此导入会让`<link ref="prefetch" as="script" href="http://localhost:3001/a.js" />`
    - `import(/*webpackChunkName: '', webpackPrefetch: true*/)`
    - preload：预加载，此资源肯定会用到，优先级高，需要提前获取。它慎用，有可能有性能隐患
    - prefetch：预获取，此资源在以后可能会用到，它是在浏览器空闲的时候加载，没有性能问题
  - 提取公共代码

  > 渲染首页的时候，先不加载 video 模块，等当我点击播放按钮的时候，才去服务器动态加载 video 模块，import 语法，import 语句是一个天然的代码分割点，如果遇到 import 就会分割了去一个单独的代码块，可以单独加载

## Tree-Shaking

- 一个模块可以有多个方法，只要其中某个方法使用到了，则整个文件都会被打到 bundle 里面去，tree-shaking 就是只把用到的方法打入 bundle，没用的会 uglify 阶段擦除掉
- 原理是利用 es6 模块的特点，只能作为模块顶层语句出现，import 的模块名只能是字符串常量
- 开启
  - webpack 默认支持，可在 production mode 中默认开启
  - 在 package.json 中配置
    - "sideEffects": false，所有的代码都没有副作用
    - 可能会把 css 和 @babel/polyfill 文件干掉
- webpack5 中的 tree-shaking，是经过加强的优化的
- Scope Hoisting
  - Scope Hoisting 可以让 webpack 打包出来的代码文件更小、运行更快，它又译作“作用域提升”
  - 原理是将所有的模块按照引用顺序放在一个函数作用域里，然后适当地重命名一些变量以防止命名冲突
  - 这个功能在 mode 为 production 下默认开启

## 环境差异

- 开发环境
  - 需要生成 sourcemap 文件
  - 需要打印 debug 信息
  - 需要 live reload 或者 hot reload 的功能
- 生产环境
  - 可能需要分离 CSS 成单独的文件，以便多个页面共享同一个 CSS 文件
  - 需要压缩 HTML/CSS/JS 代码
  - 需要压缩图片
- 其默认值为 production

### 如何配置环境信息？

- mode 默认值
- 命令行传 mode， `webpack --mode=development`
- env `webpack --env=development`
- cross-env NODE_ENV=development webpack
