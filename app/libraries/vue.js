import electron from 'electron'
import config from './config'
import option from './option'
import * as utils from './utils'
import * as storage from './storage'
import * as server from './server'

import './menu'
import './extlink'

const data = window.require('data.asar')

export default function Plugin () { }

Plugin.install = function (Vue, options) {
  Vue.prototype.$electron = electron
  Vue.prototype.$config = config
  Vue.prototype.$db = data
  Vue.prototype.$option = option
  Vue.prototype.$utils = utils
  Vue.prototype.$storage = storage
  Vue.prototype.$server = server
  Vue.config.lang = option.get('lang', 'zh-CN')
}
