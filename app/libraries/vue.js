import electron from 'electron'
import config from './config'
import * as utils from './utils'
import * as storage from './storage'
import * as server from './server'

import './menu'
import './extlink'

export default function Plugin () { }

Plugin.install = function (Vue, options) {
  Vue.prototype.$electron = electron
  Vue.prototype.$config = config
  Vue.prototype.$utils = utils
  Vue.prototype.$storage = storage
  Vue.prototype.$server = server
}
