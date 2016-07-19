/**
 * 后台HTTP服务
 */
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import config from './config'
import * as storage from './storage'
import { main as logger } from './logger'
import { getLocalAreaIp } from './utils'

const stampFormat = '\\w{' + config.stamp_length + '}'
const staticDir = path.resolve(config.app_path, 'views')

const app = express()

app.set('view engine', 'xtpl')
app.set('views', staticDir)

app.use(express.static(staticDir))
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.set('X-Powered-By', 'WEDN.NET')
  next()
})

app.use((req, res, next) => {
  // 注入请求客户端IP
  if (app.get('env') === 'development') {
    // 测试允许多次提交
    req.clientIp = new Date().getTime()
  } else {
    req.clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
  }
  // req.connection.socket.remoteAddress || '::1'
  // 注入是否本地请求
  req.isLocal = req.clientIp === '127.0.0.1' || req.clientIp === config.server_ip

  next()
})

/**
 * GET /:stamp
 */
app.get(`/:stamp(${stampFormat})`, (req, res) => {
  const { stamp } = req.params
  const data = storage.get(stamp)

  if (!data || data.status !== config.status_keys.rating) {
    res.sendStatus(404)
    return false
  }

  data.answer_options = config.answer_options

  res.render('rating', data)
})

/**
 * POST /r/:stamp
 */
app.post(`/:stamp(${stampFormat})`, (req, res) => {
  if (req.isLocal && !config.allow_admin_rating) {
    res.render('rated', { error: true, message: '您是管理员，不允许参加测评！' })
    return false
  }

  const { stamp } = req.params
  const data = storage.get(stamp)

  if (!data) {
    res.sendStatus(404)
    return false
  }

  if (data.status !== config.status_keys.rating) {
    res.render('rated', { error: true, message: '测评已经结束，不可以继续评价了！' })
    return false
  }

  if (data.receives[req.clientIp] && !config.allow_student_repeat) {
    res.render('rated', { error: true, message: '你已经评价过了，不可以重复评价！' })
    return false
  }

  // 存储
  const info = convert(stamp, req.body)
  if (!info) {
    res.render('rated', { error: true, stamp: stamp, message: '同学，请完整勾选表单选项！' })
    return false
  }

  data.receives[req.clientIp] = info
  data.receives_count++

  storage.set(stamp, data)

  res.render('rated', { error: false, message: '谢谢你的帮助，我们会及时将情况反馈给相关人员！' })
})

function convert (stamp, body) {
  const targets = storage.get(stamp).targets
  const marksKeys = Object.keys(body).filter(k => k && k !== 'name' && k !== 'hash' && k !== 'note')
  const validated = targets.length === marksKeys.length
  if (!validated) return null

  const marks = {}
  marksKeys.forEach(k => { marks[k] = parseInt(body[k], 10) })
  const feedback = {
    name: body.name,
    hash: body.hash,
    note: body.note,
    marks: marks
  }

  return feedback
}

export function start () {
  config.server_ip = getLocalAreaIp()
  // 启动服务
  const server = config.server = app.listen(config.server_port, config.server_ip, error => {
    if (error) return logger.fatal(error)
    const addr = server.address()
    const link = `http://${addr.address}:${addr.port}/`
    console.log(`server run @ ${link}`)
    config.server_link = link
  })
}
