const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../webpack.config.js')

const app = express()
// compiler 代表 webpack 编译对象
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {}))

app.get('/users', (req, res) => {
  res.json([{ id: 1 }, { id: 1 }])
})

app.listen(3332)
