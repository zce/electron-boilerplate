import fs from 'fs'
import path from 'path'

import config from './config'

const suffix = config.storage.sign
const suffixLength = Buffer.byteLength(suffix)

// ===== 目录不存在 则创建 =====
fs.existsSync(config.storage.root) || fs.mkdir(config.storage.root)

function write (uri, value) {
  value = JSON.stringify(value)
  value = value.split('').reverse().join('')
  const length = Buffer.byteLength(value)
  const buffer = Buffer.alloc(4 + length + suffixLength)
  buffer.writeUInt32BE(length, 0)
  buffer.write(value, 0 + 4)
  buffer.write(suffix, 0 + 4 + length)
  fs.writeFileSync(uri, buffer, 'binary')
}

function read (uri) {
  try {
    const buffer = fs.readFileSync(uri)
    const length = buffer.readUInt32BE(0)
    const content = buffer.toString('utf8', 0 + 4, 0 + 4 + length)
    return JSON.parse(content.split('').reverse().join(''))
  } catch (e) {
    return null
  }
}

export function set (stamp, value) {
  write(path.join(config.storage.root, stamp + config.storage.ext), value)
}

export function get (stamp) {
  return read(path.join(config.storage.root, stamp + config.storage.ext))
}

export function watch (stamp, callback) {
  fs.watchFile(path.join(config.storage.root, stamp + config.storage.ext), { interval: 500 }, (curr, prev) => {
    if (curr && curr.size && curr.mtime !== prev.mtime) {
      const data = get(stamp)
      data && callback(data)
    }
  })
}

export function getList () {
  return new Promise((resolve, reject) => {
    fs.readdir(config.storage.root, (error, files) => {
      if (error) return reject(error)
      resolve(files.filter(f => f.endsWith(config.storage.ext)))
    })
  })
}

export function watchList (callback) {
  fs.watch(config.storage.root, { interval: 400 }, (event, filename) => {
    event !== 'change' && callback()
  })
}
