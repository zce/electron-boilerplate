const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const base = require('./webpack.config.base')

module.exports = merge(base, {
  entry: {
    renderer: ['./app/renderer.js']
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
      // { test: /\.html$/, loader: 'vue-html' },
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url', query: { limit: 10000, name: 'img/[name].[hash:7].[ext]' } },
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url', query: { limit: 10000, name: 'font/[name].[hash:7].[ext]' } }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css', '.less', '.sass', '.scss', '.vue']
  },
  target: 'electron-renderer',
  devServer: {
    // contentBase: './build',
    historyApiFallback: true,
    progress: true,
    inline: true,
    colors: true,
    quiet: false,
    noInfo: false,
    // lazy: true,
    hot: true,
    port: 8080
  },
  plugins: [
    new ExtractTextPlugin('./css/[name].css')
  ],
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      less: ExtractTextPlugin.extract('css!less')
    }
  }
})

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './app/index.ejs',
      filename: 'index.html',
      title: 'ElectronBoilerplate',
      chunks: ['renderer'],
      excludeChunks: ['main'],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options: https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  ])
} else {
  module.exports.module.preLoaders.push(
    { test: /\.vue$/, loader: 'eslint' }
  )
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      template: './app/index.ejs',
      filename: 'index.html',
      title: 'ElectronBoilerplate',
      chunks: ['renderer'],
      excludeChunks: ['main'],
      inject: true
    })
  ])
}
