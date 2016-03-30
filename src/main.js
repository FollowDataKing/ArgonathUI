import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import { ts2date } from './filters'
import App from './view/App'
import Dashboard from './view/Dashboard'
import Configure from './view/Configure'

Vue.use(Router)
Vue.use(Resource)

Vue.config.debug = true

Vue.filter('ts2date', ts2date)

var router = new Router()

router.map({
  '/dashboard': {
    component: Dashboard
  },
  '/configure': {
    component: Configure
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/dashboard'
})

router.start(App, '#app')
