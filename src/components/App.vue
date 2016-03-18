<template>

  <div class="application">

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">
            <span class="glyphicon glyphicon-chevron-left"></span>
          </a>
          <a class="navbar-brand" href="./">Agornath UI</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-left">
            <li><a href="#">Home</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Source</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Technical Support</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- main view -->
    <router-view
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
  // load bootstrap css from node_modules
  require("bootstrap/dist/css/bootstrap.css")

  // load app style from source dir
  require("src/assets/css/keen-dashboards.css")

  // activiate the bootstrap.js
  import "bootstrap"
</script>
