import Vue from 'vue'

// import i18n from './i18n'
import store from './store'
import router from './router'
import App from './App.vue'

import './assets/style.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
