const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.config.base')
const config = require('../config')

module.exports = merge(base, {
  entry: {
    main: '../app/main.js'
  },
  // module: {
  //   loaders: [
  //     { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { plugins: ['transform-es2015-modules-commonjs'] } },
  //   ]
  // },
  target: 'electron',
  plugins: [
    // Copy files from app to dist
    new CopyWebpackPlugin([
      { from: '../app/package.json', to: '../build' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        HOT: JSON.stringify(process.env.HOT),
        PORT: JSON.stringify(process.env.PORT || config.server.port)
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
  }
})
