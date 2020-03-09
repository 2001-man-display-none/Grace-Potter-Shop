const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const compiler = webpack(webpackConfig)

const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
})

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

module.exports = {webpackDevMiddleware, webpackHotMiddleware}
