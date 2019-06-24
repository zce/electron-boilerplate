import { PluginObject } from 'vue'
import electron from 'electron'

const plugin: PluginObject<any> = {
  install (Vue, options) {
    Object.defineProperties(Vue, {
      electron: { get: () => electron }
    })

    Object.defineProperties(Vue.prototype, {
      $electron: { get: () => electron }
    })
  }
}

export default plugin
