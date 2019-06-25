/**
 * Helpful links
 * - https://github.com/electron/electron-quick-start/blob/master/main.js
 * - https://github.com/sindresorhus/electron-boilerplate/blob/master/index.js
 */

// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import unhandled from 'electron-unhandled'

import { state, preferences } from 'common/store'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Disable security warnings for development
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = isDevelopment ? '1' : undefined

// Catch unhandled errors and promise rejections
unhandled()

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) app.quit()

// Note: Must match `build.appId` in package.json
app.setAppUserModelId('me.zce.electron-boilerplate')

// Uncomment this before publishing your first version.
// It's commented out as it throws an error if there are no published versions.
if (!isDevelopment) {
  const FOUR_HOURS = 1000 * 60 * 60 * 4
  setInterval(() => autoUpdater.checkForUpdatesAndNotify(), FOUR_HOURS)
  autoUpdater.checkForUpdatesAndNotify()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null

const createWindow = () => {
  const lastWindowState = state.get('lastWindowState')
  const darkMode = preferences.get('darkMode')

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: lastWindowState.width,
    height: lastWindowState.height,
    x: lastWindowState.x,
    y: lastWindowState.y,
    // center: true,
    title: app.getName(),
    show: false,
    frame: false,
    backgroundColor: darkMode ? '#000' : '#fff',
    darkTheme: darkMode,
    titleBarStyle: 'hidden',
    webPreferences: {
      devTools: isDevelopment,
      nodeIntegration: true
    }
  })

  if (isDevelopment) {
    // and load localhost for HMR
    mainWindow.loadURL(
      `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    )
    // // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  } else {
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
  }

  // Emitted when the renderer process has rendered.
  mainWindow.once('ready-to-show', () => {
    // http://electronjs.org/docs/api/browser-window#using-ready-to-show-event
    // While loading the page, the ready-to-show event will be emitted
    // when the renderer process has rendered the page for the first time
    // if the window has not been shown yet.
    // Showing the window after this event will have no visual flash:
    mainWindow && mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Emitted when the app activate.
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

// Emitted when the app before quit.
app.on('before-quit', () => {
  // save window state
  mainWindow && state.set('lastWindowState', mainWindow.getNormalBounds())
})

// Restore window when open second instance
app.on('second-instance', () => {
  if (!mainWindow) return

  if (mainWindow.isMinimized()) {
    mainWindow.restore()
  }
  mainWindow.show()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
