const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

// const pkg = require('./app/package.json')

const nodeModules = (() => {
  const nodeModules = {}
  try {
    fs.readdirSync(path.resolve(__dirname, '../app/node_modules')).filter(x => x !== '.bin').forEach(mod => { nodeModules[mod] = 'commonjs2 ' + mod })
    return nodeModules
  } catch (e) {
    return {}
  }
})()

const config = module.exports = {
  context: path.resolve(__dirname, '..'),
  output: {
    // http://stackoverflow.com/questions/34371029/cannot-start-webpack-dev-server-with-gulp
    // publicPath: '/',
    path: path.resolve(__dirname, '../temp/core/'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    preLoaders: [],
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['es2015-loose'] } },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  resolve: {
    root: [path.resolve(__dirname, '../app/node_modules')],
    fallback: [path.resolve(__dirname, '../node_modules')],
    extensions: ['', '.js', '.json'],
    modulesDirectories: ['node_modules']
  },
  resolveLoader: {
    root: [path.resolve(__dirname, '../node_modules')],
    fallback: [path.resolve(__dirname, '../node_modules')]
  },
  // externals: nodeModules, // Object.keys(pkg.dependencies || {}),
  devtool: '#eval-source-map',
  plugins: [
    new webpack.ExternalsPlugin('commonjs2', nodeModules),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } })
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '' // '#source-map'
  module.exports.debug = false
  config.plugins = (config.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
} else {
  module.exports.debug = true
  config.module.preLoaders.push(
    { test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
  )
}
