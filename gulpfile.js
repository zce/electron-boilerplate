process.env.NODE_ENV = process.env.NODE_ENV || 'production'

// require core packages
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { exec, spawn } = require('child_process')

// require third party packages
const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const Promise = require('bluebird')
const del = require('del')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')
const electron = require('electron-prebuilt')
const packager = require('electron-packager')
const { createPackage } = require('asar')

// require all of config
const webpackConfigMain = require('./tasks/webpack.config.main')
const webpackConfigRenderer = require('./tasks/webpack.config.renderer')
const packagerConfig = require('./tasks/packager.config')
const updaterConfig = require('./tasks/updater.config')

// load all of plugins
const plugins = gulpLoadPlugins()

// ======================================================
// ================= utility functions ==================
// ======================================================

/**
 * Get the hash of file
 * @param  {String} filename Filepath
 * @param  {String} type     sha1/md5
 * @return {String}          hash
 */
const getFileHash = (filename, type = 'sha1') => crypto.createHash(type).update(fs.readFileSync(filename)).digest('hex')

/**
 * Archive each item in a temporary folder
 * @param  {Function}  callback Next task
 * @param  {Boolean}   prune    Remove develop denpendencies
 */
const archive = (callback, prune) => {
  const tempDir = path.resolve(__dirname, 'temp')
  const buildDir = path.resolve(__dirname, 'build')
  Promise.all(fs.readdirSync(tempDir).filter(item => fs.statSync(path.resolve(tempDir, item)).isDirectory()).map(item => new Promise(resolve => {
    const itemPath = path.resolve(tempDir, item)
    const pack = () => createPackage(itemPath, path.resolve(buildDir, item + '.asar'), () => {
      plugins.util.log('[archive]', `pack ${item} done...`)
      resolve()
    })
    if (!prune) return pack()
    exec('npm prune --production', { cwd: itemPath }).on('close', pack)
  }))).then(() => callback())
}

/**
 * Start a webpack develop server for hot replace
 * @param  {Function} callback Next task
 */
const watch = (callback) => {
  // hot module replace
  webpackConfigRenderer.entry.renderer.unshift(
    'webpack-dev-server/client?http://localhost:2080/',
    'webpack/hot/dev-server'
  )
  webpackConfigRenderer.plugins.push(new webpack.HotModuleReplacementPlugin())
  // webpack dashboard console
  if (typeof callback !== 'function') {
    const dashboard = new Dashboard()
    webpackConfigRenderer.plugins.push(new DashboardPlugin(dashboard.setData))
  }
  // webpack dev server
  const server = new WebpackDevServer(webpack(webpackConfigRenderer), {
    hot: true,
    quiet: true, // no default console
    stats: { colors: true }
  })
  server.listen(2080, 'localhost', error => {
    if (error) throw new plugins.util.PluginError('watch', error)
    plugins.util.log('[watch]', 'http://localhost:2080/webpack-dev-server/index.html')
    // keep the server alive or continue?
    typeof callback === 'function' && callback()
  })
}

/**
 * Boot build folder as electron app
 * @param  {Function} callback Next task
 * @param  {Boolean}  prune    Prune
 */
const boot = (callback, prune) => archive(
  () => spawn(electron, ['build'])
    .on('close', callback)
    .stdout.on('data', (data) => plugins.util.log('[electron]', data.toString().trim())),
  prune
)

// ======================================================
// ======================= Tasks ========================
// ======================================================

/**
 * Code lint
 */
gulp.task('lint', () => {
  return gulp.src(['gulpfile.js', 'app/**/*.js', 'app/**/*.vue', 'tasks/**/*.js', '!app/node_modules/**'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format('node_modules/eslint-friendly-formatter'))
    .pipe(plugins.eslint.failAfterError())
})

/**
 * Clean temp files
 */
gulp.task('clean', [], del.bind(this, ['build/*.asar', 'data', 'temp', '*.log']))

/**
 * Clean node_modules
 */
gulp.task('clean:npm', [], del.bind(this, ['node_modules', 'app/node_modules']))

/**
 * Complie data
 */
gulp.task('compile:data', ['clean'], () => {
  return gulp.src('./app/assets/data/**/*.*')
    .pipe(plugins.jsonminify())
    .pipe(gulp.dest('./temp/data'))
})

/**
 * Complie main process code
 */
gulp.task('compile:main', ['compile:data'], (callback) => {
  webpack(webpackConfigMain, (error, stats) => {
    if (error) throw new plugins.util.PluginError('webpack', error)
    // plugins.util.log('[webpack]', stats.toString({ colors: true }))
    callback()
  })
})

/**
 * Complie renderer process code
 */
gulp.task('compile:renderer', ['compile:main'], (callback) => {
  webpack(webpackConfigRenderer, (error, stats) => {
    if (error) throw new plugins.util.PluginError('webpack', error)
    // plugins.util.log('[webpack]', stats.toString({ colors: true }))
    callback()
  })
})

/**
 * Archive
 */
gulp.task('archive', ['compile:renderer'], (callback) => archive(callback, true))

/**
 * Distribution
 */
gulp.task('dist', ['archive'], () => {
  fs.existsSync('./dist') || fs.mkdir('./dist')
  fs.existsSync('./dist/latest') || fs.mkdir('./dist/latest')
  return gulp.src('./build/*.asar')
    .pipe(plugins.rename({ extname: '' }))
    .pipe(plugins.gzip({ gzipOptions: { level: 1 } }))
    .pipe(plugins.rename(p => {
      const pkg = require(`./temp/${p.basename}/package.json`)
      const name = `${p.basename}-${pkg.version}`
      fs.writeFileSync(`./dist/latest/${p.basename}.json`, JSON.stringify({
        url: `${updaterConfig.service}/${updaterConfig.repository}/raw/${updaterConfig.branch}/packages/${name}.gz`,
        name: p.basename,
        notes: pkg.description,
        updated: pkg.updated,
        version: pkg.version,
        sha1: getFileHash(`./build/${p.basename}.asar`, 'sha1'),
        md5: getFileHash(`./build/${p.basename}.asar`, 'md5')
      }, null, 2), 'utf8')
      p.basename = `${name}`
      p.extname = '.gz'
    }))
    .pipe(gulp.dest('./dist/packages'))
})

// gulp.task('deploy', () => {
//   return gulp.src(['dist/**/*', '!dist/releases/**'])
//     .pipe(plugins.ghPages())
// })

/**
 * Release
 */
gulp.task('release', ['archive'], (callback) => {
  plugins.util.log('[release]', '\x1b[34mBuilding electron app(s)...\x1b[0m')
  packager(packagerConfig, (error, paths) => {
    if (error) throw new plugins.util.PluginError('release', error)
    plugins.util.log('[release]', 'Build(s) successful!')
    plugins.util.log('[release]', paths)
    plugins.util.log('[release]', '\x1b[34mBuilding electron app(s) DONE\x1b[0m')
    callback()
  })
})

/**
 * Webpack dev server watch
 */
gulp.task('watch', [], () => watch())

/**
 * Develop boot app
 */
gulp.task('boot', ['compile:main'], (callback) => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  plugins.util.log('[boot]', '\x1b[35mYou must run [watch] task at first...\x1b[0m')
  boot(callback)
})

/**
 * Include watch & boot
 */
gulp.task('dev', ['compile:main'], (callback) => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  watch(() => boot(callback))
})

/**
 * Production start
 */
gulp.task('start', ['compile:renderer'], (callback) => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production'
  boot(callback, true)
})
