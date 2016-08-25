// styles
import './assets/css/normalize.css'
import './assets/css/font-awesome.css'
import './assets/less/style.less'

import Vue from 'vue'

// i18n
import I18n from 'vue-i18n'
Vue.use(I18n)
import locales from './assets/locales'
Object.keys(locales).forEach(item => Vue.locale(item, locales[item]))

// custom plugin
import Plugin from './libraries/vue'
Vue.use(Plugin)

// config
Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.config.silent = process.env.NODE_ENV === 'production'

// router
import Router from 'vue-router'
Vue.use(Router)

// routes
const router = new Router()
import routes from './libraries/routes'
router.map(routes)

// start
import App from './app'
router.start(App, 'app')
