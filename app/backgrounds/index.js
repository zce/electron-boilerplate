// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app } from 'electron'
import setAppMenu from './menu'
import createWindow from './window'
import update from './update'

let mainWindow

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (shouldQuit) {
  app.quit()
}

app.on('ready', () => {
  update(() => {
    setAppMenu()
    mainWindow = createWindow('main', {
      x: 0,
      y: 0,
      minWidth: 1200,
      minHeight: 720,
      width: 1200,
      height: 720,
      useContentSize: true,
      frame: false
    })
    if (process.env.NODE_ENV === 'production') {
      mainWindow.loadURL(`file://${__dirname}/index.html`)
    } else {
      mainWindow.loadURL('http://localhost:2080/index.html')
      mainWindow.webContents.openDevTools({ detach: false })
      // 载入开发工具
      require('devtron').install()
      require('vue-devtools').install()
    }
  })
})

app.on('window-all-closed', () => {
  app.quit()
})
