import Vue from 'vue'

import i18n from './i18n'
import store from './store'
import router from './router'
import plugin from './plugin'
import App from './App.vue'

import './assets/global.scss'

// plugins
Vue.use(plugin)

// Vue.config.productionTip = false

i18n.locale = store.getters.settings.locale

const app = new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
})

app.$mount('#app')
