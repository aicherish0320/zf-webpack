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
- 其默认值为 `production`。
