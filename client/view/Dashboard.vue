<template>
<div>
  <Tabset>
    <Tab v-for="item in config" :header="item['conf']['title']">
      <Widget :config="item['conf']" :id="''+$index"></Widget>
    </Tab>
  </Tabset>
</div>
</template>

<script>
import Widget from "../components/Widget"
import {Dashboards} from '../../imports/api/dashboard'
import Tab from "../particles/Tab"
import Tabset from "../particles/Tabset"
export default {
  components: {
    Widget,
    Tab,
    Tabset
  },
  data () {
    return {
      config: []
    }
  },
  ready: function () {
    this.subscription = Meteor.subscribe("dashboards")
    Tracker.autorun(function(){
      this.config = Dashboards.find().fetch()
      //console.log(this.config.length)
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
