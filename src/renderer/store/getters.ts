import { GetterTree } from 'vuex'
import { State } from './types'

const getters: GetterTree<State, State> = {
  settings: state => state.settings,
  activitybar: state => state.activitybar,
  sidebar: state => state.sidebar
}

export default getters
