import { app, Menu, BrowserWindow, shell, dialog } from 'electron'
import pkg from '../package.json'

const aboutDetail = `${pkg.description}
Core: v${pkg.version}
Node: v${process.versions.node}
Chrome: v${process.versions.chrome}
Electron: v${process.versions.electron}
Datetime: ${pkg.updated}
`

const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => focusedWindow && focusedWindow.reload()
      },
      {
        role: 'togglefullscreen'
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click: (item, focusedWindow) => focusedWindow && focusedWindow.webContents.toggleDevTools()
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'License',
        click: () => shell.openExternal('https://github.com/zce/electron-boilerplate/tree/master/LICENSE')
      },
      {
        label: 'About',
        click: () => {
          dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
            type: 'info',
            buttons: ['OK'],
            defaultId: 0,
            title: 'About',
            message: app.getName(),
            detail: aboutDetail,
            icon: null,
            cancelId: -1,
            noLink: true
          })
        }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  const name = app.getName()
  template.unshift({
    label: name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })
  // Window menu.
  template[3].submenu = [
    { label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
    { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
    { label: 'Zoom', role: 'zoom' },
    { type: 'separator' },
    { label: 'Bring All to Front', role: 'front' }
  ]
}

export default () => {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
