<template>
<div class="hold-transition login-page">
  <div class="login-box">
  <div class="login-logo">
    <b>Argonath</b> Dashboard
  </div>
  <div class="login-box-body">
    <p class="login-box-msg">Sign in to start your session</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group has-feedback">
      <input type="text" class="form-control" placeholder="Username" v-model="username" required autofocus>
      <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
    </div>
    <div class="form-group has-feedback">
      <input type="password" class="form-control" placeholder="Password" v-model="password" required>
      <span class="glyphicon glyphicon-lock form-control-feedback"></span>
    </div>
    <div class="row" style="padding-left:20px">
      <div class="col-xs-8">
        <div class="checkbox icheck">
          <label>
            <input type="checkbox"> Remember Me
          </label>
        </div>
      </div>
      <div class="col-xs-4">
        <button type="submit" class="btn btn-primary btn-block btn-flat" @click.prevent="submit">Sign In</button>
      </div>
    </div>
    <a v-link="{path: '/register'}" class="text-center">Register a new membership</a>
  </div>
  </div>
</div>
</template>

<script>
import auth from '../libs/meteor_auth'
import {router} from '../main'
export default {
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    submit () {
      let username = this.username
      let password = this.password
      auth.login(username, password, function (error) {
        if (error) {
          this.error = error.reason
        } else {
          router.go("/app/dashboard")
        }
      }.bind(this))
    }
  },
  route: {
    // if already login, router to dashboard
    canActivate ({ next }) {
      if (auth.isUserAuth()) {
        //alert(2)
        router.go("/app/dashboard")
      } else {
        //alert(1)
        next()
      }
    }
  }
}

</script>
