import { PluginObject } from 'vue'
import electron from './electron'

const plugin: PluginObject<any> = {
  install (Vue, options) {
    electron(Vue, options)
  }
}

export default plugin
