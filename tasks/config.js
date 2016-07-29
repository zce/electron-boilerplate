const os = require('os')
const path = require('path')
const pkg = require('../build/package.json')
const argv = require('minimist')(process.argv.slice(2))

module.exports = {
  'dir': path.resolve(__dirname, '../build'),
  'out': path.resolve(__dirname, '../dist/releases'),
  'name': argv.name || pkg.productName,
  'icon': path.resolve(__dirname, './resources/icon'),
  'platform': argv.platform || os.platform(),
  'arch': argv.arch || os.arch(),
  'build-version': pkg.version,
  'ignore': [],
  'overwrite': true,
  'prune': argv.prune || false,
  'version': argv.version || require('../node_modules/electron-prebuilt/package.json').version,
  'app-version': pkg.version,
  // 'asar': {
  //   ordering: '',
  //   unpack: '*.asar',
  //   unpackDir: ''
  // },
  'asar': false,
  'download': {},
  'app-bundle-id': `net.wedn.${pkg.name}`,
  'helper-bundle-id': `net.wedn.${pkg.name}.helper`,
  'osx-sign': false,
  // 'app-category-type': 'public.app-category.developer-tools',
  'app-category-type': 'public.app-category.productivity',
  'app-copyright': `Copyright (c) ${new Date().getFullYear()} WEDN.NET.`,
  'version-string': {
    CompanyName: 'WEDN.NET',
    FileDescription: 'EBP',
    OriginalFilename: 'EBP.exe',
    ProductName: pkg.productName,
    InternalName: 'EBP.exe'
  }
}
