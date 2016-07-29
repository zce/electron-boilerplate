process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const spawn = require('child_process').spawn

const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const Promise = require("bluebird")
const del = require('del')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const electron = require('electron-prebuilt')
const packager = require('electron-packager')
const { createPackage } = require('asar')

const webpackConfigMain = require('./tasks/webpack.config.main')
const webpackConfigRenderer = require('./tasks/webpack.config.renderer')
const options = require('./tasks/config')

const plugins = gulpLoadPlugins()
const PluginError = plugins.util.PluginError

gulp.task('clean', [], del.bind(this, ['temp', 'build/*.asar']))
gulp.task('clean:npm', [], del.bind(this, ['node_modules', 'app/node_modules']))

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

gulp.task('compile:data', ['clean'], () => {
  return gulp.src('./app/assets/data/**/*.*')
    .pipe(plugins.jsonminify())
    .pipe(gulp.dest('./temp/data'))
})

gulp.task('compile:main', ['compile:data'], (callback) => {
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

const archive = (callback) => {
  const tempDir = path.resolve(__dirname, 'temp')
  const buildDir = path.resolve(__dirname, 'build')
  const targets = fs.readdirSync(tempDir).filter(item => fs.statSync(path.resolve(tempDir, item)).isDirectory())
  const asarArchive = (item) => new Promise(resolve => createPackage(path.resolve(tempDir, item), path.resolve(buildDir, item + '.asar'), () => {
    plugins.util.log('archive', `pack ${item} done...`)
    resolve()
  }))
  Promise.all(targets.map(item => asarArchive(item))).then(() => callback())
}

const getFileStamp = (filename, type) => {
  type = type || 'sha1'
  const buffer = fs.readFileSync(filename)
  var hash = crypto.createHash(type)
  hash.update(buffer)
  return hash.digest('hex')
}

gulp.task('archive', ['compile:renderer'], archive)

// const repo = 'https://raw.githubusercontent.com/zce/electron-boilerplate/vue-auto-update/dist/'
const repo = 'http://git.oschina.net/wedn/ebp/raw/master/'

gulp.task('dist', ['archive'], () => {
  fs.existsSync('./dist') || fs.mkdir('./dist')
  fs.existsSync('./dist/latest') || fs.mkdir('./dist/latest')
  return gulp.src('./build/*.asar')
    .pipe(plugins.rename({ extname: '' }))
    .pipe(plugins.gzip({ gzipOptions: { level: 9 } }))
    .pipe(plugins.rename(p => {
      const pkg = require(`./temp/${p.basename}/package.json`)
      const name = `${p.basename}-${pkg.version}`
      fs.writeFileSync(`./dist/latest/${p.basename}.json`, JSON.stringify({
        url: `${repo}packages/${name}.gz`,
        name: p.basename,
        notes: pkg.description,
        updated: pkg.updated,
        version: pkg.version,
        sha1: getFileStamp(`./build/${p.basename}.asar`)
      }, null, 2), 'utf8')
      p.basename = `${name}`
      p.extname = '.gz'
    }))
    .pipe(gulp.dest('./dist/packages'))
})

gulp.task('release', ['archive'], (callback) => {
  plugins.util.log('release', '\x1b[34mBuilding electron app(s)...\x1b[0m')
  packager(options, (error, paths) => {
    if(error) throw new PluginError('release', error)
    plugins.util.log('release', 'Build(s) successful!')
    plugins.util.log('release', paths)
    plugins.util.log('release', '\n\x1b[34mBuilding electron app(s) DONE\x1b[0m')
    callback()
  })
})

// ======================================================
// ==================== 启动执行任务 ====================
// ======================================================

gulp.task('boot', ['compile:main'], (callback) => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  archive(() => spawn(electron, ['build']).on('close', callback).stdout.on('data', (data) => {
    plugins.util.log('electron', data.toString())
  }))
})

gulp.task('start', ['compile:renderer'], (callback) => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production'
  archive(() => spawn(electron, ['build']).on('close', callback).stdout.on('data', (data) => {
    plugins.util.log('electron', data.toString())
  }))
})
