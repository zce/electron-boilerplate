import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('dashboard', require('../views/dashboard')),
    name: 'dashboard'
  },
  '/demo': {
    component: Vue.component('demo', require('../views/demo')),
    name: 'demo'
  },
  '/vuex': {
    component: Vue.component('vuex', require('../views/vuex')),
    name: 'vuex'
  }
}
