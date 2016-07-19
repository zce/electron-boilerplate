import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('dashboard', require('./components/dashboard')),
    name: 'dashboard'
  },
  '/demo': {
    component: Vue.component('demo', require('./components/demo')),
    name: 'demo'
  },
  '/start': {
    component: Vue.component('start', require('./components/start')),
    name: 'start'
  },
  '/watch/:item': {
    component: Vue.component('watch', require('./components/watch')),
    name: 'watch'
  },
  '/preview/:item': {
    component: Vue.component('preview', require('./components/preview')),
    name: 'preview'
  }
}
