<template>
<div>
  <div v-if = "config.length === 1">
    <Widget :config="config[0]['conf']" :id="'0'"></Widget>
  </div>
  <div v-if = "config.length === 0">
    Config The Dashboard First! 🐔🐔🐔!
  </div>
  <div v-if = "config.length > 1">
    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs pull-left">
        <li v-for="item in config" :class="$index===0?'active':''">
          <a :href="'#dashboard'+$index" data-toggle="tab">Dashboard#{{$index}}</a>
        </li>
      </ul>
      <div class="tab-content no-padding">
        <div
          v-for="item in config"
          class="chart tab-pane"
          :class="$index===0?'active':''"
          :id="'dashboard'+$index"
          style="position: relative;">
            <Widget :config="item['conf']" :id="''+$index"></Widget>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Widget from "../components/Widget"
import {Dashboards} from '../../imports/api/dashboard'
export default {
  components: {
    Widget
  },
  data () {
    return {
      config: []
    }
  },
  created: function () {
    this.subscription = Meteor.subscribe("dashboards")
    Tracker.autorun(function(){
      this.config = Dashboards.find().fetch()
      console.log(this.config[0]);
    }.bind(this))
  },
  destroyed: function () {
    this.subscription.stop()
  },
  route: {
    // if already login, router to dashboard
    // canActivate ({ redirect, next }) {
    //   if (auth.isUserAuth()) {
    //     router.go("/app/dashboard")
    //   } else {
    //     next()
    //   }
    // }
  }
}
</script>
