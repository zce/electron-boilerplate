import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('dashboard', require('./components/dashboard')),
    name: 'dashboard'
  },
  '/demo': {
    component: Vue.component('demo', require('./components/demo')),
    name: 'demo'
  }
}
