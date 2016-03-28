import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import { domain, fromNow } from './filters'
import App from './components/App.vue'
import Dashboard from './components/Dashboard.vue'
import Test from './components/Test.vue'
import AddPage from './view/config.vue'

// install router
Vue.use(Router)
Vue.use(Resource)

Vue.config.debug = true

// register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

// routing
var router = new Router()

router.map({
  '/dashboard': {
    component: Dashboard
  },
  '/test': {
    component: Test
  },
  '/addpage': {
    component: AddPage
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/dashboard'
})

router.start(App, '#app')
