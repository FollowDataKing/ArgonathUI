<template>
  <div class="chart-wrapper">
    <div class="chart-title">
      Title of widget #{{id}}
    </div>
    <div :id="'w-' + id" class="chart-stage">
      <!-- <img v-if="type == 'placeholder'" data-src="holder.js/100%x{{ height }}/white"> -->
      <Loading v-if="status == 'loading'"></Loading>
      <div v-else>
        <!-- <path-nav :path="['Home', 'Library', 'Data']"></path-nav> -->
        <filter-panel :options="['foo', 'bar', 'bbb', 'aaa', 'ccc', 'dddd', 'eeee', 'ffff']" placeholder="placeholder"></filter-panel>

        <div class="input-group">
          <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
          <!-- <input type="text" placeholder="Type Message ..." class="form-control"> -->
          <input type="text" class="form-control pull-right" id="mypicker">
          <span class="input-group-btn">
            <button type="button" class="btn btn-primary btn-flat"><i class="fa fa-check"></i></button>
          </span>
        </div>
        <div class="input-group">
          <div class="input-group-addon" style="width:38px;">T</div>
          <input type="text" placeholder="Type Message ..." class="form-control">
          <span class="input-group-btn">
            <button type="button" class="btn btn-primary btn-flat"><i class="fa fa-check"></i></button>
          </span>
        </div>
        <responsive-table
          :columns="columns"
          :records="data">
        </responsive-table>
      <canvas v-if="type == 'chart'" id="myChart"></canvas>
    </div>
  </div>
  <div class="chart-notes">
    Notes about widget #{{id}}
  </div>
</div>
</template>

<script>

require("daterangepicker/daterangepicker-bs3.min.css")

// import Chart from "chart.js"
import Loading from "./particles/Loading.vue"
import ResponsiveTable from "./particles/ResponsiveTable.vue"
import PathNav from "./particles/PathNav.vue"
import FilterPanel from "./particles/FilterPanel.vue"

// import moment from "moment"
require("daterangepicker/daterangepicker.js")

$(function() {
  alert(1)
  //Date range picker
  jQuery('#mypicker').daterangepicker();
});

export default {
  props: {
    model: Object,
    id: String
  },

  data () {
    return {
      status: "loading",
      scheme: {
        alias: {
          create_time: "日期",
          BALANCE: "余额",
          ALIPAY: "支付宝",
          TENPAY: "微信",
          TENPAY2: "微信2",
          TOTAL: "总额"
        },
        // groupBy: ["create_time"],
        // filters: ["create_time", "city_code", "shop_area_code", "shop_id"],
        dimension: "create_time",
        measures: [ "BALANCE", "ALIPAY", "TENPAY", "TENPAY2", "TOTAL" ]
      },
      data: { },
      drilled: []
    }
  },

  computed: {
    height: function () {
      return this.model.height || 120
    },
    type: function() {
      return this.model.type
    },
    columns: function () {
      var cols = []
      cols.push({
        key: this.scheme.dimension,
        label: this.scheme.alias[this.scheme.dimension]
      })

      for (var idx in this.scheme.measures) {
        var measure_key = this.scheme.measures[idx]
        cols.push({
          key: measure_key,
          label: this.scheme.alias[measure_key]
        })
      }

      return cols
    }
  },

  components: {
    Loading,
    ResponsiveTable,
    PathNav,
    FilterPanel
  },

  ready() {



    // GET request
    this.$http({url: this.model.api.url, method: 'GET'})
    .then(function (response) {
      // success callback
      this.data = response.data
      this.status = "ready"



    }, function (response) {
      // error callback
      this.status = "error"
      console.log(response)
    });
  },

  events: {
    'dblclickedOnTableCell': function (column, row) {
      if (column.key == this.scheme.dimension) {
        console.log("dblclicked on dimension: " + column.key)
      }
    }
  },
}

</script>
