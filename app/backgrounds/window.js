import fs from 'fs'
import path from 'path'
import { app, BrowserWindow, screen } from 'electron'

const dir = app.getPath('userData')

export default (name, options) => {
  const stateStoreFile = path.join(dir, 'window-state-' + name + '.json')
  const defaultSize = { width: options.width, height: options.height }

  let state = {}
  let win

  const restore = () => {
    try {
      return Object.assign({}, defaultSize, JSON.parse(fs.readFileSync(stateStoreFile)))
    } catch (err) {
      return Object.assign({}, defaultSize)
    }
  }

  const getCurrentState = () => {
    const position = win.getPosition()
    const size = defaultSize.useContentSize ? win.getContentSize() : win.getSize()
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
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2
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
    fs.writeFileSync(stateStoreFile, JSON.stringify(state), 'utf8')
  }

  state = ensureVisibleOnSomeDisplay(restore())

  win = new BrowserWindow(Object.assign({}, options, state))

  win.on('close', saveState)

  return win
}
