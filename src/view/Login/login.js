import auth from '../../libs/auth'
import md5 from 'md5'

export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit () {
      var credentials = {
        user: this.credentials.username,
        pwd: md5(this.credentials.password)
      }
      auth.login(this, credentials, '/daily_reports')
    }
  },
  route: {
    canActivate ({ redirect, next }) {
      if (auth.user.authenticated) {
        redirect('pages')
      } else {
        next()
      }
    }
  }
}
