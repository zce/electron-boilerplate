/*!
 * Teaching management system
 *   https://tms.wedn.net/
 *
 * Date:
 *   2016-07-30T23:56:12.476Z
 *
 * Maintainers:
 *   汪磊 <ice@wedn.net> (http://github.com/zce)
 *
 * License:
 *   https://github.com/zce/itcast-tms/tree/master/LICENSE
 *   Released under the MIT license
 *
 * Thanks:
 *   [Vue](https://vuejs.org)
 *   [Electron](https://electron.atom.io)
 *   [Desktop UI](https://github.com/zce/desktop-ui)
 *   [Electron Bolierplate](https://github.com/zce/electron-boilerplate)
 *   etc.
 *
 * Copyright 2015-2016 WEDN, Inc. and other contributors
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const os = require('os')
const fs = require('original-fs')
const path = require('path')
const electron = require('electron')
const manifestFilename = path.resolve(os.tmpdir(), electron.app.getName(), 'manifest.json')

try {
  fs.accessSync(manifestFilename, fs.constants.R_OK)
  const manifest = JSON.parse(fs.readFileSync(manifestFilename, 'utf8'))
  manifest.forEach(item => {
    fs.writeFileSync(item.to, fs.readFileSync(item.from))
    fs.unlinkSync(item.from)
  })
  fs.unlinkSync(manifestFilename)
} catch (e) {
  console.log(e.message)
}

require('./core.asar')
