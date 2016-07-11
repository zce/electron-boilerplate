const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// const pkg = require('./app/package.json')

const nodeModules = (() => {
  const nodeModules = {}
  try {
    fs.readdirSync(path.resolve(__dirname, './app/node_modules')).filter(x => x !== '.bin').forEach(mod => { nodeModules[mod] = 'commonjs2 ' + mod })
    return nodeModules
  } catch (e) {
    return {}
  }
})()

const config = module.exports = {
  context: __dirname,
  entry: {
    main: ['./app/main.js'],
    renderer: ['./app/renderer.js']
  },
  output: {
    path: './build/',
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    preLoaders: [],
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['es2015-loose'] } },
      { test: /\.json$/, loader: 'json' },
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
      // { test: /\.html$/, loader: 'vue-html' },
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url', query: { limit: 10000, name: 'img/[name].[hash:7].[ext]' } },
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url', query: { limit: 10000, name: 'font/[name].[hash:7].[ext]' } }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css', '.less', '.sass', '.scss', '.vue'],
    fallback: [path.resolve(__dirname, './node_modules')],
    alias: { app: path.resolve(__dirname, './app') }
  },
  resolveLoader: {
    fallback: [path.resolve(__dirname, './node_modules')]
  },
  // externals: nodeModules, // Object.keys(pkg.dependencies || {}),
  target: 'electron-renderer',
  devtool: '#eval-source-map',
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
  node: {
    __filename: false,
    __dirname: false
  },
  plugins: [
    new webpack.ExternalsPlugin('commonjs2', nodeModules),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } }),
    new CopyWebpackPlugin([
      { from: './app/package.json', to: '.' },
      { from: './app/node_modules', to: './node_modules' }
    ]),
    new ExtractTextPlugin('./css/[name].css')
  ],
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      less: ExtractTextPlugin.extract('css!less')
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  config.plugins = (config.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.OccurenceOrderPlugin(),
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
  config.module.preLoaders.push(
    {
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    },
    {
      test: /\.vue$/,
      loader: 'eslint'
    }
  )
  config.plugins = (config.plugins || []).concat([
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
