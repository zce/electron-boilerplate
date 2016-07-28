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
