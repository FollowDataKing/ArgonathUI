<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// root view
// load bootstrap css from node_modules
require("bootstrap/dist/css/bootstrap.css")
require("font-awesome/css/font-awesome.min.css")
require("ionicons/dist/css/ionicons.min.css")
require("admin-lte/dist/css/AdminLTE.css")
require("admin-lte/dist/css/skins/skin-blue.min.css")
// activiate the bootstrap.js
import "jquery"
import "bootstrap"
import "admin-lte/dist/js/app.min.js"
</script>
