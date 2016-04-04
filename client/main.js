import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
var VueValidator = require('vue-validator')
import { ts2date } from './filters'
import Root from './view/Root'
import App from './view/App'
import Register from './view/Register'
import Login from './view/Login'
import Dashboard from './view/Dashboard'
import Configure from './view/Configure'
import { Template } from 'meteor/templating'

Vue.use(Router)
Vue.use(Resource)
Vue.use(VueValidator)

Vue.config.debug = true

Vue.filter('ts2date', ts2date)

export var router = new Router()

router.map({
  '/register': {
    component: Register,
    name: 'register'
  },
  '/login': {
    component: Login,
    name: 'login'
  },
  '/app': {
    component: App,
    subRoutes: {
      '/dashboard': {
        component: Dashboard
      },
      '/configure': {
        component: Configure
      }
    }
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  "*": "/app/dashboard"
})

//Template.body.onRendered(function () {
router.start(Root, '#app')
//})
