import log4js from 'log4js'
import config from './config'

log4js.configure({
  appenders: [{ type: 'console' }].concat(config.log4js)
})

export const main = log4js.getLogger('main')
export const renderer = log4js.getLogger('renderer')
