const path = require('path')
const nodemailer = require('nodemailer')
const xtpl = require('xtpl')

const report = require('./report')
const config = require('../config')
const { transport, from } = config.mail

const txtTemplate = path.join(config.static_root, 'txt.xtpl')
const mailTemplate = path.join(config.static_root, 'mail.xtpl')

const Transport = nodemailer.createTransport(transport)

module.exports = (data) => {
  // 计算结果
  data = report(data)

  // 发送邮件
  const to = `${data.teacher_name} <${data.teacher_email}>`
  const cc = []
  if (process.env.NODE_ENV === 'production') {
    data.emails.concat(data.added_emails).forEach(e => cc.push(`${e.name} <${e.email}>`))
  }
  // 邮件标题
  const subject = `❈ 教学测评报告：${data.teacher_name}老师（${data.course_name}）`
    // 附件和正文
  const attachments = []
  let body = ''
  let all = ''
  Object.keys(data.result).forEach(version => {
    xtpl.renderFile(txtTemplate, { data, version }, (error, content) => {
      if (error) return Promise.reject(error)
      const filename = `${data.datetime.replace(/-/g, '').replace(/:/g, '').replace(/\s/g, '')}_${data.teacher_name}_${version}.txt`
      attachments.push({ filename, content })
      all += content
    })
  })

  // 渲染邮件模板
  xtpl.renderFile(mailTemplate, { data, hash: encrypt(all) }, (error, content) => {
    if (error) return Promise.reject(error)
    body += content
  })
  // body += `<hr><br><p>${encrypt(all)}</p>`
  return send({ from: from, to: to.toString(), cc: cc.toString(), subject: subject, html: body, attachments: attachments })
}

function send (message) {
  return new Promise((resolve, reject) => {
    if (!(message && message.subject && message.html && message.from && message.to)) {
      return reject(new Error('邮件信息不完整'))
    }

    Object.assign(message, {
      generateTextFromHTML: true,
      encoding: 'base64'
    })

    Transport.sendMail(message, (error, response) => {
      if (error) return reject(error)

      if (Transport.transportType !== 'DIRECT') return resolve(response)

      response.statusHandler.once('failed', data => {
        let reason = 'errors.mail.failedSendingEmail.error'

        if (data.error && data.error.errno === 'ENOTFOUND') {
          reason += 'errors.mail.noMailServerAtAddress.error domain: ' + data.domain
        }
        reason += '.'

        return reject(new Error(reason))
      })

      response.statusHandler.once('requeue', data => {
        let errorMessage = 'errors.mail.messageNotSent.error'

        if (data.error && data.error.message) {
          errorMessage += 'errors.general.moreInfo info: ' + data.error.message
        }

        return reject(new Error(errorMessage))
      })

      response.statusHandler.once('sent', () => {
        return resolve('notices.mail.messageSent')
      })
    })
  })
}

const crypto = require('crypto')

const encrypt = (text) => crypto.createHash('sha1').update(crypto.createHash('md5').update(text).digest('base64') + config.report_token).digest('hex')
