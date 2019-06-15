/**
 * Helpful links:
 * - https://codeburst.io/vuex-and-typescript-3427ba78cfa8
 * - https://juejin.im/post/5c46c625e51d456e4138fa82
 * - https://github.com/Microsoft/TypeScript-Vue-Starter
 */

import Vue from 'vue'
import Vuex from 'vuex'

import { State } from './types'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import plugins from './plugins'
import modules from './modules'

Vue.use(Vuex)

const strict: boolean = process.env.NODE_ENV !== 'production'

export default new Vuex.Store<State>({
  state,
  getters,
  mutations,
  actions,
  plugins,
  modules,
  strict
})
