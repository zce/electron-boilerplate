process.env.NODE_ENV = process.env.NODE_ENV || 'production'
const path = require('path')
const pkg = require('../app/package.json')
const argv = require('minimist')(process.argv.slice(2))

const appCategoryType = 'public.app-category.developer-tools'
const appCopyright = `Copyright (c) ${new Date().getFullYear()} WEDN.NET.`
const appBundleId = `net.wedn.${pkg.name}`
const appVersion = pkg.version
const arch = argv.arch || 'all'
const asar = argv.asar || true
const asarUnpack = ''
const asarUnpackDir = ''
const buildVersion = pkg.version
const dir = path.resolve(__dirname, '../build')
const download = {}
const helperBundleId = `net.wedn.${pkg.name}.helper`
const icon = path.resolve(__dirname, './resources/icon')
const ignore = [/node_modules|src/]
const name = argv.name || pkg.productName
const out = path.resolve(__dirname, '../releases')
const overwrite = true
const platform = argv.platform || 'all'
const prune = argv.prune || false
const version = argv.version || require('../node_modules/electron-prebuilt/package.json').version
const versionString = {
  CompanyName: 'WEDN.NET',
  FileDescription: 'EBP',
  OriginalFilename: 'EBP.exe',
  ProductName: pkg.productName,
  InternalName: 'EBP.exe'
}

const base = {
  build: {
    'dir': dir,
    'out': out,
    'name': name,
    'icon': icon,
    'platform': platform,
    'arch': arch,
    'build-version': buildVersion,
    'ignore': ignore,
    'overwrite': overwrite,
    'prune': prune,
    'version': version,
    'app-version': appVersion,
    'asar': asar,
    'asar-unpack': asarUnpack,
    'asar-unpack-dir': asarUnpackDir,
    'download': download,
    'app-bundle-id': appBundleId,
    'helper-bundle-id': helperBundleId,
    'app-category-type': appCategoryType,
    'app-copyright': appCopyright,
    'version-string': versionString
  }
}

module.exports = Object.assign({}, base, require(`./${process.env.NODE_ENV}`))
