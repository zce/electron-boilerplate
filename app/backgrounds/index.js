// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app } from 'electron'
// import setAppMenu from './menu'
import createWindow from './window'

let mainWindow

app.on('ready', () => {
  // setAppMenu()
  mainWindow = createWindow('main', {
    // backgroundColor: 'transparent',
    // transparent: true,
    x: 0,
    y: 0,
    width: 1200,
    height: 720,
    useContentSize: true,
    frame: false
  })
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL(`file://${__dirname}/index.html`)
  } else {
    mainWindow.loadURL('http://localhost:2080/index.html')
    mainWindow.webContents.openDevTools({ detach: true })
    // mainWindow
    require('devtron').install()
    require('vue-devtools').install()
  }
})

app.on('window-all-closed', () => {
  app.quit()
})
