import { VueConstructor } from 'vue'
import electron from 'electron'

export default (Vue: VueConstructor, options: any) => {
  Object.defineProperties(Vue, {
    electron: { get: () => electron }
  })

  Object.defineProperties(Vue.prototype, {
    $electron: { get: () => electron }
  })
}
