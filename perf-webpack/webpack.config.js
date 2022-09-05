const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 可以读取 .env 文件，获取
module.exports = {
  mode: 'development',
  context: process.cwd(),
  // entry: './src/index.js',
  // mpa
  entry: {
    page1: '/src/page1.js',
    page2: '/src/page2.js',
    page3: '/src/page3.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 默认只分割异步模块
      minSize: 0, // 分割出去的代码块的最小体积 0表示不限制
      minRemainingSize: 0, // 分割后 剩下的体积 webpack5 新增
      minChunks: 1, // 如果此模块被多个入口引用几次会被分割
      maxAsyncRequests: 30, // 异步请求最大分割出去几个代码块
      maxInitialRequests: 30, // 同步时最大分割出去几个代码块
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // 缓存组配置 配置如何对模块分组 相同分组会分到一个代码块中
        defaultVendors: {
          // 第三方模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 很多缓存组，如果一个模块同属于多个缓存组，应该分配到哪个组，看优先级高
          reuseExistingChunk: true // 是否可复用现有的代码块
        },
        default: {
          minChunks: 2, // 被几个入口引用，最少两次才提取
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|jpeg)$/i,
        use: [
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page1.html',
      chunks: ['page1']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page2.html',
      chunks: ['page2']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'page3.html',
      chunks: ['page3']
    })
  ]
}
