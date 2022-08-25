const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    open: true,
    compress: true,
    static: {
      // 额外的静态文件根目录
      directory: path.resolve(__dirname, 'static')
    }
  },
  module: {
    rules: [
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
  ]
}
