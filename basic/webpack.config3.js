const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

/*
  mode 只是在模块内可用，在node环境中不可用
*/

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'), // 会成为默认的静态文件服务器
    clean: true
  },
  devServer: {
    port: '3301',
    // open: true,
    compress: true,
    static: {
      // 额外的静态文件根目录
      directory: path.resolve(__dirname, 'static')
    }
  },
  watch: true, // 默认是 false，监听文件的变化
  watchOptions: {
    ignored: /node_modules/, // 忽略文件，不监听此目录里的文件变化
    aggregateTimeout: 300, // 防抖
    poll: 1000 // 原理是轮询，是每隔一段时间监控文件的变化 文件变化之后重新打包
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      // expose-loader 可以把一个变量放在全局对象上
      // {
      //   test: require.resolve('lodash'),
      //   loader: 'expose-loader',
      //   options: {
      //     exposes: {
      //       globalName: '_', // 放的全局变量名
      //       override: true // 如果原来这个变量有值的话，是否要覆盖
      //     }
      //   }
      // },
      // {
      //   test: /\.js$/i,
      //   use: ['babel-loader'],
      //   exclude: /node_modules/
      // },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(jpeg|png)$/i,
        use: {
          loader: 'url-loader',
          options: {
            // esModule: false,
            name: `[name].[hash:8].[ext]`,
            limit: 800 * 1024 // 如果文件太小，不需要拷贝文件，也不需要发 http 请求了，只需要把文件变成 base64 字符串内嵌到 html 页面中
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
    // new webpack.ProvidePlugin({
    //   // 自动向模块内注入第三方模块 相当去自动引入 import _ from 'lodash'
    //   _: 'lodash'
    // })
  ]
}
