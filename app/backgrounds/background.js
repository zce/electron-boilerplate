// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app } from 'electron'
import setAppMenu from './menu'
import createWindow from './window'

let mainWindow

app.on('ready', () => {
  setAppMenu()
  mainWindow = createWindow('main', {
    width: 1700,
    height: 600,
    useContentSize: true,
    // frame: false,
    // backgroundColor: 'transparent',
    transparent: true
  })
  if (process.env.NODE_ENV === 'production') {
    mainWindow.loadURL(`file://${__dirname}/index.html`)
  } else {
    mainWindow.loadURL('http://localhost:8080/index.html')
    mainWindow.webContents.openDevTools({ detach: false })
  }
})

app.on('window-all-closed', () => {
  app.quit()
})
