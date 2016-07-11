import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('dashboard', require('./components/dashboard')),
    name: 'dashboard'
  }
  // '/editor': {
  //   component: Vue.component('editor', require('./components/Editor')),
  //   name: 'editor'
  // },
  // '/watch/:item': {
  //   component: Vue.component('watcher', require('./components/Watcher')),
  //   name: 'watcher'
  // },
  // '/preview/:item': {
  //   component: Vue.component('preview', require('./components/Preview')),
  //   name: 'preview'
  // }
}
