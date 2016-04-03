<template>
  <header class="main-header">
    <a v-link="{path: '/app/dashboard'}" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>A</b>LT</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Argonath</b></span>
    </a>
    <!-- Header Navbar -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <!-- Menu Toggle Button -->
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <img v-bind:src="img" class="user-image" alt="User Image">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs">Alexander Pierce</span>
              </a>
            </li>
            <!-- Control Sidebar Toggle Button -->
            <li>
              <a href="#" data-toggle="control-sidebar" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
  </header>
</template>

<script>
  import auth from '../libs/meteor_auth'
  import {router} from '../main'
  export default {
    data () {
      return {
        img: require("admin-lte/dist/img/user2-160x160.jpg")
      }
    },
    methods: {
      logout () {
        auth.logout(function(error){
          if (!error) {
            router.go("/login")
          }
        })
      }
    }
  }
</script>
