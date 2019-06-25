import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  // base: process.env.BASE_URL,
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  routes: [
    {
      name: 'home',
      path: '/home',
      component: Home
    },
    {
      name: 'settings',
      path: '/settings',
      component: Settings
    }
    // {
    //   name: 'about',
    //   path: '/about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
