import fs from 'fs'
import path from 'path'
import electron from 'electron'

export default class Store {
  private path: string
  private data: any

  private parse (contents: string, defaults: any) {
    try {
      return JSON.parse(contents)
    } catch (e) {
      return defaults
    }
  }

  private read (defaults: any) {
    return this.parse(fs.readFileSync(this.path, 'utf8'), defaults)
  }

  private write () {
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }

  constructor (options: string | { name: string; defaults?: any }) {
    const app = electron.app || electron.remote.app
    const root = app.getPath('userData')

    if (typeof options === 'string') {
      options = { name: options }
    }

    this.path = path.join(root, options.name + '.json')
    this.data = this.read(options.defaults)
  }

  get (key: string) {
    return this.data[key]
  }

  set (key: string, value: any) {
    this.data[key] = value
    this.write()
  }

  clear () {
    this.data = null
    this.write()
  }
}
