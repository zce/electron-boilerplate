import { Plugin } from 'vuex'
import { settings } from 'common/store'
import { State } from './types'
import { UPDATE_SETTINGS } from './mutation-types'

const storagePlugin: Plugin<State> = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type !== UPDATE_SETTINGS) return
    settings.store = state.settings
  })
}

export default [storagePlugin]
