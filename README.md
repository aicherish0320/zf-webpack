# Webpack

本质上，webpack 是一个用于现代 Javascript 应用程序的静态模块打包工具，当 Webpack 处理应用程序时，它会在内部构件一个依赖图 (dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle

## 入口

- 入口起点指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始，进入入口起点后，webpack 会找出有哪些模块和库是入口起点依赖（直接或间接）的
- 默认值是`./src/index.js`，但是可以通过 `webpack.config.js` 中配置 `entry`属性，来指定一个或多个不同的入口起点

## 插件

- loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量

## 模式(mode)

- 日常的前端开发工作中，一般都会有两套环境
- 一套开发时使用，构件结果用于本地开发调试，不进行代码压缩、打印 debug 信息，包含 sourcemap 文件
- 一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印 debug 信息，静态文件不包括 sourcemap
- webpack4.x 引入了 mode 的概念
- 当你指定使用 production mode 时，默认会启用各种性能优化的功能，包括构件结果优化以及 webpack 运行性能优化
- 如果是 development mode 时，则会开发 debug 工具，运行时打印详细的错误信息，以及更快速的增量编译构建

### 环境差异

- 开发环境
  - 需要生成 sourcemap 文件
  - 需要打印 debug 信息
  - 需要 live reload 或者 hot reload 的功能
- 生成环境
  - 可能需要分离 css 成单独的文件，以便多个页面共享同一个 css 文件
  - 需要压缩 HTML/CSS/JS 代码
  - 需要压缩图片
- 其默认值为 `production`

## 支持 CSS

- css-loader 用来翻译处理 @import 和 url()
  - 处理 import 和 url
- style-loader 可以把 css 插入到 dom 中
  - css -> js 脚本，并插入到页面中
- Less-loader
  - Less -> css

### CSS 兼容性

- 为了浏览器的兼容性，有时候我们必须加入一些前缀
- 伪元素
- `postcss-loader` 可以使用 `postcss`处理 css
- `postcss-preset-env` 把现代的 css 转换成大多数浏览器能理解的

## 支持图片

- `file-loader`解决 css 等文件中的引入图片路径问题
- `url-loader`当图片小于`limit`的时候会把图片 `base64`编码，大于 limit 参数的时候还是使用 `file-loader`

## JS 兼容性

- Babel 其实是一个编译 JavaScript 的平台，可以把 ES6/ES7，React 的 JSX 转义为 ES5
- `@babel/preset-env`
  - babel 默认只转换最新的 ES 语法，比如：箭头函数
- babel-loader 只是一个转换函数，并不能识别 JS 语法，也不知道如何转换
- 得认识 JS 代码，知道如何把老代码转换成新代码
- @babel/core 它是 babel 核心模块，它认识 JS 代码，能够识别 JS 代码，不知道如何转换写法
- babel 插件知道如何把老语法转成新的语法，每个插件会对应一个语法，比如说箭头函数 
- 把插件打包成 Preset 预设，就是插件的集合

## sourcemap

- `sourcemap` 是为了解决开发代码与实际运行代码不一致时帮助我们 `debug`到原始开发代码的技术
- `webpack` 通过配置可以自动给我们 `source maps`文件，`map` 文件是一种对应编译文件和源文件的方法

### 配置项

- `eval`：使用 eval 包裹模块代码
- `source-map`：产生 .map 文件
- `cheap` 不包含列信息，也不包含 loader 的 sourcemap
- `module`包含` loader`的 `sourcemap`，否则无法定义源文件
- `inline`将 `.map`作为 data URI 嵌入，不单独产生 .map 文件

### 组合规则

- `source-map` 单独在外部生成完整的sourcemap 文件，并且在目标文件里建立关联，能提示错误代码的准确原始位置
- `inline-source-map`以`base64`格式内联在打包后的文件中，内联构建速度更快，也能提示错误代码的准确原始位置
- `hidden-source-map` 会在外部生成 source map ，但是在目标文件里没有建立关联，不能提示错误代码的准确原始位置
- `eval-source-map` 会为每一个模块生成一个单独的 sourcemap 文件进行内联，并使用 eval 执行
- `cheap-source-map` 外部生成 source map 文件，不包含列和 loader 的 map

### 最佳实践

- 开发环境
  - 我们在开发环境对 source map 的要求是：速度快、调试更友好
  - 想要速度快，推荐 eval-cheap-source-map
  - 如果想调试更友好 cheap-module-source-map
  - 折中选择就是 eval-source-map
- 生成环境
  - 首先排除内联，因为一方面我们隐藏了源代码，另一方面减少文件体积
  - 要想调试友好 sourcemap > cheap-source-map
  - 想要速度快 cheap
  - 折中的选择就是 hidden-source-map

# 学什么

- 学原理；js css html 一定要掌握
- 这些库，只需要知道，这些库能解决的问题，能力边界、应用场景，具体到用到的时候，再看文档

