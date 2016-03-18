import Vue from 'vue'
import Router from 'vue-router'
import { domain, fromNow } from './filters'
import App from './components/App.vue'
import Dashboard from './components/Dashboard.vue'

// install router
Vue.use(Router)

Vue.config.debug = true

// register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

// routing
var router = new Router()

router.map({
  '/dashboard': {
    component: Dashboard
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/dashboard'
})

router.start(App, '#app')
