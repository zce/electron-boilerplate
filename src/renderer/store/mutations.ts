import { MutationTree } from 'vuex'
import { State } from './types'
import { UPDATE_SETTINGS } from './mutation-types'

const mutations: MutationTree<State> = {
  [UPDATE_SETTINGS]: (state, settings: { [key: string]: any }) => {
    Object.assign(state.settings, settings)
  }
}

export default mutations
