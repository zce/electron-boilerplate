import { systemPreferences } from 'electron'
import Store from 'electron-store'

export const state = new Store({
  name: 'state',
  defaults: {
    lastWindowState: {
      width: 1024,
      height: 768,
      x: undefined as number | undefined,
      y: undefined as number | undefined
    }
  }
})

export const preferences = new Store({
  name: 'preferences',
  defaults: {
    darkMode: systemPreferences.isDarkMode()
  }
})
