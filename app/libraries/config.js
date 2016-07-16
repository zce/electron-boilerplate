import path from 'path'
import electron from 'electron'
import pkg from '../package.json'

const app = electron.app || electron.remote.app

export default {
  app_name: app.getName(),
  app_version: app.getVersion(),
  app_updated: pkg.updated,
  app_description: pkg.description,
  storage_root: path.resolve(app.getPath('userData'), 'data'), // ????
  storage_ext: '.dat',
  storage_sign: `© ${new Date().getFullYear()} WEDN.NET`,
  server_port: 0, // ????
  stamp_length: 8,
  status_keys: {
    initial: '尚未开始统计',
    rating: '统计中',
    rated: '统计完成',
    sending: '邮件发送中',
    send: '邮件发送完成'
  },
  answer_options: {
    0: { short: 'A', full: 'A. 非常清楚' },
    1: { short: 'B', full: 'B. 基本清楚' },
    2: { short: 'C', full: 'C. 有点模糊' },
    3: { short: 'D', full: 'D. 几乎不懂' }
  },
  allow_admin_rating: true,
  allow_student_repeat: false
}
