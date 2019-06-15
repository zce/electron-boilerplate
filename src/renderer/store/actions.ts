import { ActionTree } from 'vuex'
import { State } from './types'
import { UPDATE_SETTINGS } from './mutation-types'

const actions: ActionTree<State, State> = {
  updateSettings: ({ commit }, settings: { [key: string]: any }) => {
    commit(UPDATE_SETTINGS, settings)
  }
}

export default actions
