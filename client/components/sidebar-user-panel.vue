<template>
  <!-- Sidebar user panel -->
  <div class="user-panel">
    <div class="pull-left image">
      <img :src="img" class="img-circle" alt="User Image">
    </div>
    <div class="pull-left info">
      <p>Alexander Pierce</p>
      <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      img: require("admin-lte/dist/img/user2-160x160.jpg")
    }
  }
}
</script>
