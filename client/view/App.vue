<template>
  <div class="wrapper">
    <Dheader></Dheader>
    <Sider></Sider>
    <Content></Content>
    <Dfooter></Dfooter>
  </div>
</template>

<script>
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
  // load components
  import Dheader from "../components/Header.vue"
  import Sider from "../components/Sider.vue"
  import Content from "../components/Content.vue"
  import Dfooter from "../components/Footer.vue"
  export default {
    components: {Dheader, Sider, Content, Dfooter}
  }
</script>
