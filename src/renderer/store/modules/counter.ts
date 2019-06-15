import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { State } from '../types'

// types
interface CounterState {
  count: number
}

// mutation types
const INCREMENT: string = 'INCREMENT'
const DECREMENT: string = 'DECREMENT'

// initial state
const state: CounterState = {
  count: 0
}

// getters
const getters: GetterTree<CounterState, State> = {
  count: state => state.count
}

// mutations
const mutations: MutationTree<CounterState> = {
  [INCREMENT]: state => {
    state.count++
  },
  [DECREMENT]: state => {
    state.count--
  }
}

// actions
const actions: ActionTree<CounterState, State> = {
  increment: ({ commit }) => commit(INCREMENT),
  incrementAsync: ({ commit }) => setTimeout(() => commit(INCREMENT), 1000),
  decrement: ({ commit }) => commit(DECREMENT),
  decrementAsync: ({ commit }) => setTimeout(() => commit(DECREMENT), 1000)
}

// namespaced
const namespaced: boolean = true

// expose module
export default { state, getters, mutations, actions, namespaced }
