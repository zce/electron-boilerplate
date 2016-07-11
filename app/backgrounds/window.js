// This helper remembers the size and position of your windows (and restores
// them in that place after app relaunch).
// Can be used for more than one window, just construct many
// instances of it and give each different name.

import { app, BrowserWindow, screen } from 'electron'
import jetpack from 'fs-jetpack'
const userData = jetpack.cwd(app.getPath('userData'))

export default (name, options) => {
  const stateStoreFile = 'window-state-' + name + '.json'
  let state = {}
  let win

  const restore = () => {
    try {
      return Object.assign({}, options, userData.read(stateStoreFile, 'json'))
    } catch (err) {
      return Object.assign({}, options)
    }
  }

  const getCurrentState = () => {
    const position = win.getPosition()
    const size = win.getSize()
    return { x: position[0], y: position[1], width: size[0], height: size[1] }
  }

  const windowWithinBounds = (windowState, bounds) => {
    return windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
  }

  const resetToDefaults = (windowState) => {
    const bounds = screen.getPrimaryDisplay().bounds
    return Object.assign({}, options, {
      x: (bounds.width - options.width) / 2,
      y: (bounds.height - options.height) / 2
    })
  }

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen.getAllDisplays().some((display) => windowWithinBounds(windowState, display.bounds))
    if (!visible) {
      return resetToDefaults(windowState)
    }
    return windowState
  }

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentState())
    }
    userData.write(stateStoreFile, state, { atomic: true })
  }

  state = ensureVisibleOnSomeDisplay(restore())

  win = new BrowserWindow(Object.assign({}, options, state))

  win.on('close', saveState)

  return win
}
