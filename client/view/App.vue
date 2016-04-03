<template>
<div class="hold-transition skin-blue sidebar-mini">
  <div class="wrapper">
    <Dheader></Dheader>
    <Sider></Sider>
    <Content></Content>
    <Dfooter></Dfooter>
  </div>
</div>
</template>

<script>
  import auth from '../libs/meteor_auth'
  import {router} from '../main'
  import Dheader from "../components/Header.vue"
  import Sider from "../components/Sider.vue"
  import Content from "../components/Content.vue"
  import Dfooter from "../components/Footer.vue"
  export default {
    components: {Dheader, Sider, Content, Dfooter},
    route: {
      canActivate ({next}) {
        if (!auth.isUserAuth()) {
          router.go("/login")
        } else {
          next ()
        }
      }
    }
  }
</script>
