/**
 * 后台HTTP服务
 */
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import config from './config'
import { main as logger } from './logger'

// const stampFormat = '\\w{' + config.stamp_length + '}'

const app = express()

app.set('view engine', 'xtpl')
app.set('views', path.resolve(__dirname, './main/view'))

// app.use(express.static(path.resolve(__dirname, './main/static')))

app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.set('X-Powered-By', 'WEDN.NET')
  next()
})

app.use((req, res, next) => {
  // 注入请求客户端IP
  if (process.env.NODE_ENV === 'production') {
    req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
  } else {
    // 测试允许多次提交
    req.clientIp = new Date().getTime()
  }
  // req.connection.socket.remoteAddress || '::1'
  // 注入是否本地请求
  req.isLocal = req.clientIp === '127.0.0.1' || req.clientIp === config.server_ip

  next()
})

let server

function listen (callback) {
  server = app.listen(config.server.port, config.server.address, error => {
    if (error) {
      server = null
      return logger.fatal(error)
    }
    const addr = server.address()
    console.log(`server run @ http://${addr.address}:${addr.port}/`)
    config.server.port = addr.port
    config.server.address = addr.address
    typeof callback === 'function' && callback()
  })
}

export function start (callback) {
  // 启动服务
  if (server && server.listening) {
    return server.close(listen.bind(server, callback))
  }
  listen(callback)
}
