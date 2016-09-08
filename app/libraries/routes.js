const views = [
  require('../views/dashboard'),
  require('../views/start'),
  require('../views/watch'),
  require('../views/vuex'),
  require('../views/demo'),
  require('../views/blank')
]

const routes = {}
views.forEach(v => { routes[v.pathname] = { name: v.name, component: v } })

export default routes
