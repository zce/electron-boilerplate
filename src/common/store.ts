import { api, darkMode } from 'electron-util'
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

export const settings = new Store({
  name: 'settings',
  defaults: {
    theme: darkMode.isEnabled ? 'dark' : 'light',
    locale: api.app.getLocale(),
    titleBarStyle: 'custom' as 'custom' | 'native'
  }
})
