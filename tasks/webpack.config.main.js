const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.config.base')

module.exports = merge(base, {
  entry: {
    main: ['./app/main.js']
  },
  target: 'electron-main',
  node: {
    __filename: false,
    __dirname: false
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './app/package.json', to: '.' },
      { from: './app/update.html', to: '.' },
      { from: './app/node_modules', to: './node_modules' }
    ])
  ],
})
