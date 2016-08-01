import { BrowserWindow } from 'electron'
import updater from 'asar-updater'
import config from '../../tasks/updater.config'

const server = `${config.service}/${config.repository}/raw/${config.branch}/latest/`

updater.init()
updater.setFeedURL('core.asar', server + 'core.json')
updater.setFeedURL('data.asar', server + 'data.json')

let updaterWindow = null
let webContents = null
export default (callback) => {
  updater
    .on('available', (task) => {
      if (!updaterWindow) {
        updaterWindow = new BrowserWindow({ width: 600, height: 400, resizable: false, movable: false, frame: false })
        updaterWindow.on('closed', () => { updaterWindow = null })
        // 加载更新提示界面
        updaterWindow.loadURL(`file://${__dirname}/update.html`)
        webContents = updaterWindow.webContents
        // webContents.openDevTools({ detach: true })
      }
    })
    .on('not-available', (task) => {
      webContents && webContents.send('update_message', `『${task.name}』无需更新！`)
    })
    .on('progress', (task, p) => {
      webContents && webContents.send('update_progress', p)
      if (p === -1) {
        webContents && webContents.send('update_message', `『${task.name}』更新中...`)
      }
    })
    .on('downloaded', (task) => {
      webContents && webContents.send('update_message', `『${task.name}』更新完成！`)
    })
    .on('completed', (result) => {
      if (!result) return callback()
      webContents && webContents.send('update_done', '全部更新完成！正在重启')
      updater.quitAndInstall(1000)
    })
    .on('error', (error) => {
      if (error) webContents && webContents.send('update_done', '更新出错，请联系作者！')
      callback()
    })
    .checkForUpdates()
}
