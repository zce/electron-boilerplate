process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const spawn = require('child_process').spawn

const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const del = require('del')
const electron = require('electron-prebuilt')
const packager = require('electron-packager')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackConfigMain = require('./tasks/webpack.config.main')
const webpackConfigRenderer = require('./tasks/webpack.config.renderer')
const options = require('./tasks/config')

const plugins = gulpLoadPlugins()
const PluginError = plugins.util.PluginError

gulp.task('clean', [], del.bind(this, ['build']))

gulp.task('watch', [], (callback) => {
  webpackConfigRenderer.entry.renderer.unshift('webpack-dev-server/client?http://localhost:2080/', 'webpack/hot/dev-server')
  webpackConfigRenderer.plugins.push(new webpack.HotModuleReplacementPlugin())
  new WebpackDevServer(webpack(webpackConfigRenderer), {
    hot: true,
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 1000 // is this the same as specifying --watch-poll?
    // },
    stats: {
      colors: true
    }
  }).listen(2080, 'localhost', (error) => {
    if (error) throw new PluginError('webpack-dev-server', error)
    plugins.util.log('[webpack-dev-server]', 'http://localhost:2080/webpack-dev-server/index.html')
    // keep the server alive or continue?
    // callback()
  })
})

gulp.task('compile:main', ['clean'], (callback) => {
  webpack(webpackConfigMain, (error, stats) => {
    if (error) throw new PluginError('webpack', error)
    // plugins.util.log('[webpack]', stats.toString({ colors: true }))
    callback()
  })
})

gulp.task('compile:renderer', ['compile:main'], (callback) => {
  webpack(webpackConfigRenderer, (error, stats) => {
    if (error) throw new PluginError('webpack', error)
    // plugins.util.log('[webpack]', stats.toString({ colors: true }))
    callback()
  })
})

// gulp.task('compile', ['compile:renderer'])

gulp.task('boot', ['compile:main'], () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  spawn(electron, ['build'])
})

// gulp.task('dev', ['watch'], () => {
//   return gulp.start(['boot'])
// })

gulp.task('start', ['compile:renderer'], () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production'
  spawn(electron, ['build'])
})

gulp.task('release', ['compile:renderer'], (callback) => {
  // plugins.util.log('[release]', '\x1b[34mBuilding electron app(s)...\n\x1b[0m')
  plugins.util.log('[release]', '\x1b[34mBuilding electron app(s)...\x1b[0m')
  packager(options, (error, paths) => {
    if(error) throw new PluginError('release', error)
    plugins.util.log('[release]', 'Build(s) successful!')
    plugins.util.log('[release]', paths)
    plugins.util.log('[release]', '\n\x1b[34mBuilding electron app(s) DONE\x1b[0m')
    callback()
  })
})

gulp.task('default', [], () => {

})
