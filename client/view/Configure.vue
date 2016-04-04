<template>
  <div class="box box-info">
    <div class="box-header with-border">
      <h3 class="box-title">Add dashboard</h3>
    </div>
    <validator name="validation">
    <div class="box-body">
      <ul>
        <li v-for="dashboard in dashboards">{{dashboard.conf.title}}<button @click="removeDashboard(dashboard._id)">[X]</button></li>
      </ul>
      <div class="alert alert-danger" v-show="$validation.invalid">
        <ul>
          <li v-for="error in $validation.errors">
            <p>{{error.field}}: {{error.message}}</p>
          </li>
        </ul>
      </div>
        <input type="text" v-model="title" placeholder="Set dashboard title"  v-validate:title="{
          required: {rule: true, message: 'title is required'}
        }">
        <div class="box-tools pull-right">
          <label class="checkbox-inline">
            <input type="checkbox" value="line" v-model="components" v-validate:components="{
              required: {rule:true, message:'component is required'}
            }"> Add Line
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" value="bar" v-model="components" v-validate:components> Add Bar
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" value="pie" v-model="components" v-validate:components> Add Pie
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" value="table" v-model="components" v-validate:components> Add Table
          </label>
        </div>
        <textarea class="textarea" placeholder="Config Json" v-model="conf" v-validate:conf="{
          required:{rule:true,message:'conf is required'}
        }"
          style="width: 100%; height: 330px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;margin-top:10px;">
        </textarea>
    </div>
    <div class="box-footer clearfix">
      <div class="box-tools pull-right">
        <button class="btn btn-primary" @click="addDashboard" v-if="$validation.valid">Confirm</button>
      </div>
    </div>
  </validator>
  </div>
</template>

<script>
import {Dashboards} from '../../imports/api/dashboard'
export default {
  data () {
    return {
      title: "",
      components: [],
      conf: "",
      dashboards: []
    }
  },
  methods: {
    addDashboard: function () {
      let conf = JSON.parse(this.conf)
      let dataObject = {
        title: this.title,
        vistypes: this.components
      }
      Meteor.call("dashboards.insert", Object.assign(dataObject, conf))
      this.title = ""
      this.components = []
      this.conf = ""
    },
    removeDashboard: function (id) {
      Meteor.call("dashboards.remove", id)
    }
  },
  created: function () {
    this.subscription = Meteor.subscribe("dashboards")
    Tracker.autorun(function(){
      this.dashboards = Dashboards.find().fetch()
    }.bind(this))
  },
  destroyed: function () {
    this.subscription.stop()
  }
}
</script>
