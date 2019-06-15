import { ModuleTree } from 'vuex'
import { State } from '../types'

import counter from './counter'

const modules: ModuleTree<State> = { counter }

export default modules
