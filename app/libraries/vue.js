import path from 'path'
import electron from 'electron'
import config from './config'
import * as option from './option'
import * as utils from './utils'
import * as storage from './storage'
import * as server from './server'
import { renderer as logger } from './logger'

import './menu'
import './extlink'

export default function Plugin () { }

Plugin.install = function (Vue, options) {
  Vue.prototype.$electron = electron
  Vue.prototype.$config = config
  Vue.prototype.$option = option
  Vue.prototype.$logger = logger
  Vue.prototype.$utils = utils
  Vue.prototype.$storage = storage
  Vue.prototype.$server = server
  Vue.prototype.$db = global.require(path.resolve(config.app.path, 'data.asar'))

  Vue.config.lang = option.get('lang', 'zh-CN')
}
