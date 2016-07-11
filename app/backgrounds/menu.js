import { app, BrowserWindow, Menu, shell } from 'electron'
import createWindow from './window'

const aboutHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>About</title>
  <style>
    body {
      margin: 0 auto;
      background: #F0F0F0;
      width: 400px;
      height: 120px;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Electron Boilerplate</h1>
  <p>A boilerplate application for Electron runtime</p>
</body>
</html>
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
        const aboutWindow = createWindow(about, { width: 420, height: 150, useContentSize: true, modal: true, parent: BrowserWindow.getFocusedWindow() })
        aboutWindow.setMenu(null)
        aboutWindow.loadURL(`data:text/html, ${aboutHtml}`)
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
