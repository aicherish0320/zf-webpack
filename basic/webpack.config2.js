const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const webpack = require('webpack')

/*
  mode 只是在模块内可用，在node环境中不可用
*/

module.exports = {
  mode: 'development',
  // devtool: 'eval-source-map', // 不生成 sourcemap，关掉内部生成 sourcemap 逻辑
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
    }),
    new webpack.SourceMapDevToolPlugin({
      // 向输出文件里添加的映射文件
      append: `\n//# sourceMappingURL=http://127.0.0.1:3300/[url]`,
      filename: `[file].map` // main.js -> main.js.map
    }),
    // 生成 sourcemap 文件，但是 sourcemap 只会放在本机，不会发不到生成上去
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: './dist/**/*.map',
              destination: path.resolve(__dirname, 'maps')
            }
          ],
          delete: ['./dist/**/*.map']
        }
      }
    })
  ]
}
