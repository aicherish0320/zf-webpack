const path = require('path')
// const webpack = require('webpack')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const notifier = require('node-notifier')
// const speedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')
// 因为 JS 和 CSS 的加载可以并行加载，所以我们可以通过此插件提取 css 成单独的文件，然后去掉无用的 css 并进行压缩
// const loggerLoader = require('./loaders/loggerLoader')
// const icon = path.join(__dirname, 'icon.jpg')

// const smp = new speedMeasureWebpackPlugin()

const loadersPath = path.resolve(__dirname, 'loaders')

const glob = require('glob')
const { DefinePlugin, IgnorePlugin } = require('webpack')
const PATHS = {
  src: path.resolve(__dirname, 'src')
}

// 可以读取 .env 文件，获取里面的值，设置到 process.env.NODE_ENV 里面
require('dotenv').config()

console.log('webpack.config.js >>> ', process.env.NODE_ENV)

module.exports = {
  // mode: 'development',
  devtool: 'source-map',
  context: process.cwd(), // 上下文目录，项目的根目录
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  optimization: {
    minimize: true, // 开启最小化
    minimizer: [new TerserPlugin()]
  },
  module: {
    // 如果模块的路径匹配此正则的话，就不需要去查找里面的依赖项 require import
    noParse: /title.js/,
    rules: [
      // {
      //   test: /\.js$/i,
      //   include: path.resolve(__dirname, 'src'),
      //   exclude: /node_modules/, // 不解析 node_modules
      //   use: [
      //     {
      //       // thread-loader 开启线程池，开线程和线程通信都需要时间
      //       loader: 'thread-loader',
      //       options: { workers: 3 }
      //     },
      //     {
      //       loader: 'babel-loader',
      //       options: {
      //         cacheDirectory: true
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
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
  resolve: {
    // extensions: ['.js', '.jsx', 'json'] // 指定文件的扩展名
    // alias: {}, // 指定查找别名
    // modules: ['node_modules'], // 指定查找目录
    // mainFields: ['browser', 'module', 'main'], // 从 package.json 中的哪个字段查找入口文件
    // mainFiles: ['index'] // 如果找不到 mainFields 的话，会找索引文件，index.js
  },
  resolveLoader: {
    modules: [loadersPath, 'node_modules']
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // new FriendlyErrorsWebpackPlugin({
    //   onErrors: (severity, errors) => {
    //     let error = errors[0]
    //     notifier.notify({
    //       title: '编译失败',
    //       message: severity + ':' + error.name,
    //       subtitle: error.file || '',
    //       icon
    //     })
    //   }
    // }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启动展示打包报告的 HTTP 服务区
      generateStatsFile: true // 要生成 stats.json 文件
    }),
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new OptimizeCssAssetsPlugin(),
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    })
    // new DefinePlugin({
    //   // 定义在编译阶段使用的全局变量，在浏览器运行阶段就是值了
    //   'process.env.NODE_ENV': JSON.stringify('development')
    // })
  ]
}
