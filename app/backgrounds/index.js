import { app } from 'electron'
import setAppMenu from './menu'
import createWindow from './window'
import update from './update'

let mainWindow

// single window instance
const shouldQuit = app.makeSingleInstance(() => {
  if (!mainWindow) return
  if (mainWindow.isMinimized()) mainWindow.restore()
  mainWindow.focus()
})

if (shouldQuit) app.quit()

app.on('ready', () => {
  // check for update
  update(() => {
    // set app menu
    setAppMenu()
    // create window
    mainWindow = createWindow('main', {
      // x: 0,
      // y: 0,
      minWidth: 1200,
      minHeight: 720,
      width: 1200,
      height: 720,
      useContentSize: true,
      frame: false
    })
    // load main page
    if (process.env.NODE_ENV === 'production') {
      return mainWindow.loadURL(`file://${__dirname}/index.html`)
    }
    mainWindow.loadURL('http://localhost:2080/index.html')
    mainWindow.webContents.openDevTools({ detach: false })
    // load chrome exts
    require('devtron').install()
    require('vue-devtools').install()
  })
})

app.on('window-all-closed', app.quit)
