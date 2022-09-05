const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 可以读取 .env 文件，获取
module.exports = {
  mode: 'production',
  context: process.cwd(),
  // entry: './src/index.js',
  // mpa
  entry: {
    page1: '/src/page1.js',
    page2: '/src/page2.js'
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
      template: './src/index.html'
    })
  ]
}
