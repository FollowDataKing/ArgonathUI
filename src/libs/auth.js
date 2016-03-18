import Settings from '../settings/Settings'
import {router} from '../main'

export default {

  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post(Settings.auth.url, creds, (data) => {
      // console.log(data)
      localStorage.setItem('id_token', data.sessionId)

      this.user.authenticated = true

      if (redirect) {
        console.log(router)
        router.go(redirect)
      }

    }).error((err) => {
      context.error = err
    })
  },

  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    }else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
