import { app, BrowserWindow, dialog, Menu, shell } from 'electron'
import pkg from '../package.json'
// import createWindow from './window'

const aboutDetail = `${pkg.description}
Core: v${pkg.version}
Node: v${process.versions.node}
Chrome: v${process.versions.chrome}
Electron: v${process.versions.electron}
Datetime: ${pkg.updated}
`

export const edit = {
  label: 'Edit',
  submenu: [
    { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
    { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
    { type: 'separator' },
    { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
    { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
    { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
    { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
  ]
}

export const about = {
  label: 'About',
  submenu: [
    {
      label: 'License',
      click: () => shell.openExternal('https://github.com/zce/electron-boilerplate/tree/master/LICENSE')
    },
    {
      label: 'About',
      click: () => {
        // const aboutWindow = createWindow(about, { width: 420, height: 150, useContentSize: true, modal: true, parent: BrowserWindow.getFocusedWindow() })
        // aboutWindow.setMenu(null)
        // aboutWindow.loadURL(`data:text/html, ${aboutHtml}`)
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
        // dialog.showErrorBox('Electron Boilerplate', 'A boilerplate application for Electron runtime')
      }
    }
  ]
}

export const development = {
  label: 'Dev',
  submenu: [
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: () => BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache()
    },
    {
      label: 'Toggle DevTools',
      accelerator: 'Alt+CmdOrCtrl+I',
      click: () => BrowserWindow.getFocusedWindow().toggleDevTools()
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () => app.quit()
    }
  ]
}

export default () => {
  const menus = [edit, about]
  if (process.env.NODE_ENV !== 'production') {
    menus.push(development)
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus))
}
