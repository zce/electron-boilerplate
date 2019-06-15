import { Plugin } from 'vuex'
import { State } from './types'
import { UPDATE_SETTINGS } from './mutation-types'

const storagePlugin: Plugin<State> = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type !== UPDATE_SETTINGS) return
    window.localStorage.setItem(
      'electron-boilerplate-settings',
      JSON.stringify(state.settings)
    )
  })
}

export default [storagePlugin]
