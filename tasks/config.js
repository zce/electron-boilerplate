const path = require('path')
const pkg = require('../app/package.json')
const argv = require('minimist')(process.argv.slice(2))

module.exports = {
  'dir': path.resolve(__dirname, '../build'),
  'out': path.resolve(__dirname, '../releases'),
  'name': argv.name || pkg.productName,
  'icon': path.resolve(__dirname, './resources/icon'),
  'platform': argv.platform || 'all',
  'arch': argv.arch || 'all',
  'build-version': pkg.version,
  'ignore': [],
  'overwrite': true,
  'prune': argv.prune || false,
  'version': argv.version || require('../node_modules/electron-prebuilt/package.json').version,
  'app-version': pkg.version,
  'asar': {
    ordering: '',
    unpack: '',
    unpackDir: ''
  },
  'download': {},
  'app-bundle-id': `net.wedn.${pkg.name}`,
  'helper-bundle-id': `net.wedn.${pkg.name}.helper`,
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
