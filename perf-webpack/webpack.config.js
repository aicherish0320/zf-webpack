const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier')
const speedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const loggerLoader = require('./loaders/loggerLoader')
const icon = path.join(__dirname, 'icon.jpg')

const smp = new speedMeasureWebpackPlugin()

const loadersPath = path.resolve(__dirname, 'loaders')

module.exports = smp.wrap({
  mode: 'development',
  devtool: 'source-map',
  context: process.cwd(), // 上下文目录，项目的根目录
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        let error = errors[0]
        notifier.notify({
          title: '编译失败',
          message: severity + ':' + error.name,
          subtitle: error.file || '',
          icon
        })
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启动展示打包报告的 HTTP 服务区
      generateStatsFile: true // 要生成 stats.json 文件
    })
  ]
})
