<template>
<div class="hold-transition register-page">
  <div class="register-box">
    <div class="register-logo">
      <b>Argonath</b> Dashboard
    </div>
    <div class="register-box-body">
      <p class="login-box-msg">Register a new membership</p>
        <div class="alert alert-danger" v-if="error">
          <p>{{ error }}</p>
        </div>
        <div class="form-group has-feedback">
          <input type="text" class="form-control" placeholder="Full name" v-model="username">
          <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Password" v-model="password">
          <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
          <input type="password" class="form-control" placeholder="Retype password" v-model="confirm">
          <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
        </div>
        <div class="row">
          <!-- /.col -->
          <div class="col-xs-12">
            <button type="submit" class="btn btn-primary btn-block btn-flat" @click.prevent="submit">Register</button>
          </div>
          <!-- /.col -->
        </div>
      <a v-link="{path: '/login'}" class="text-center">I already have a membership</a>
    </div>
  </div>
</div>
</template>

<script>
  import register from '../libs/register'
  import {router} from '../main'
  import auth from '../libs/meteor_auth'
  export default {
    data () {
      return {
        username: "",
        password: "",
        confirm: "",
        error: ""
      }
    },
    methods: {
      submit (e) {
        if (this.username && this.password && this.confirm) {
          if (register.checkPassword(this.password, this.confirm)) {
            register.createUser(this.username, this.confirm, function (error) {
              if (error) {
                this.error = error.reason
              } else {
                router.go("login")
              }
            }.bind(this))
          } else {
            this.error = "password error"
          }
        } else {
          this.error = "confirm fields are not null"
          console.log(this.error);
        }
      }
    },
    route: {
      // if already login, router to dashboard
      canActivate ({ redirect, next }) {
        if (auth.isUserAuth()) {
          router.go("/app/dashboard")
        } else {
          next()
        }
      }
    }
  }
</script>

<style>
  body{
    background: #d2d6de;
  }
</style>
