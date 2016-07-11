// import path from 'path'
// import fse from 'fs-extra'
// import Promise from 'bluebird'
// import XTemplate from 'xtemplate'
// import config from '../../config'
// import * as storage from './storage'
// import * as server from './server'
// import * as utils from './utils'

const fs = Promise.promisifyAll(fse)

export default function Plugin () {

}

Plugin.install = function (Vue, options) {
  // Vue.prototype.$config = config
  // Vue.prototype.$storage = storage
  // Vue.prototype.$fs = fs
  // Vue.prototype.$path = path
  // Vue.prototype.$utils = utils
  // Vue.prototype.$render = (template, locals) => {
  //   return new XTemplate(template).render(locals)
  // }
  // Vue.prototype.$server = server
}
