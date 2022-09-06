const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 可以读取 .env 文件，获取
module.exports = {
  mode: 'development',
  context: process.cwd(),
  // entry: './src/index.js',
  // mpa
  entry: {
    entry1: '/src/entry1.js',
    entry2: '/src/entry2.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxSize: 0,
      cacheGroups: {
        default: false,
        commons: {
          minChunks: 1,
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
