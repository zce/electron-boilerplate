import { State } from './types'

const getSettings = () => {
  try {
    const contents = window.localStorage.getItem(
      'electron-boilerplate-settings'
    )
    if (!contents) throw new Error('storage key not found')
    return JSON.parse(contents)
  } catch (e) {
    return {
      theme: 'dark',
      locale: 'en'
    }
  }
}

const state: State = {
  settings: getSettings(),
  activitybar: {},
  sidebar: {}
}

export default state
