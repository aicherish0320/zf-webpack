const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractCss = require('mini-css-extract-plugin')

/*
  mode 只是在模块内可用，在node环境中不可用
*/

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'), // 会成为默认的静态文件服务器
    clean: true,
    publicPath: '/' // 加载、插入产出文件的时候的路径前缀
    // assetModuleFilename: 'images/[hash][ext][query]'
  },
  // 内部就是一个 express 服务器
  // 其实本质上来说 webpack-dev-server 就是等于 express 服务 + webpackDevMiddleware
  devServer: {
    port: '3301',
    // open: true,
    compress: true,
    static: {
      // 额外的静态文件根目录
      directory: path.resolve(__dirname, 'static')
    },
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      devServer.app.get('/api/users', (req, res) => {
        res.json([{ id: 1 }, { id: 1 }])
      })
    }

    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3332',
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
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
        use: [MiniCssExtractCss.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractCss.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractCss.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpeg|png)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]'
        }
        // type: 'asset/inline'
        // type: 'asset/source'
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     // esModule: false,
        //     name: `[name].[hash:8].[ext]`,
        //     // limit: 800 * 1024, // 如果文件太小，不需要拷贝文件，也不需要发 http 请求了，只需要把文件变成 base64 字符串内嵌到 html 页面中
        //     outputPath: 'images',
        //     publicPath: '/images'
        //   }
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractCss({
      filename: 'css/[name].css'
    })
    // new webpack.ProvidePlugin({
    //   // 自动向模块内注入第三方模块 相当去自动引入 import _ from 'lodash'
    //   _: 'lodash'
    // })
  ]
}
