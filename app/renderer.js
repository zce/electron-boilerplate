import './assets/css/normalize.css'
import './assets/css/font-awesome.css'
import './assets/less/style.less'

import './libraries/context-menu'
import './libraries/external-links'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router()

import routes from './routes'
router.map(routes)

import App from './app'
router.start(App, 'app')
