<template>
  <div class="chart-wrapper">
    <div class="chart-title">
      Title of widget #{{id}}
    </div>
    <div :id="'w-' + id" class="chart-stage">
      <!-- <img v-if="type == 'placeholder'" data-src="holder.js/100%x{{ height }}/white"> -->
      <Loading v-if="status == 'loading'"></Loading>
      <div v-else>
        <responsive-table
          :dimension="data.dimension"
          :measures="data.measures">
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
// import Chart from "chart.js"
import Loading from "./particles/Loading.vue"
import ResponsiveTable from "./particles/ResponsiveTable.vue"

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
        dimension: "create_time",
        measures: [ "BALANCE", "ALIPAY", "TENPAY", "TENPAY2", "TOTAL" ]
      },
      data: { }
    }
  },

  computed: {
    height: function () {
      return this.model.height || 120
    },
    type: function() {
      return this.model.type
    }
  },

  components: {
    Loading,
    ResponsiveTable
  },

  ready() {
    // GET request
    this.$http({url: 'http://data4:1060/statistics/query/payment', method: 'GET'})
    .then(function (response) {
      // success callback

      var data = {
        dimension: {
          label: this.scheme.alias[this.scheme.dimension],
          data: []
        },
        measures: {}
      }

      for (var idx in this.scheme.measures) {
        var measure_key = this.scheme.measures[idx]
        data.measures[measure_key] = {
          label: this.scheme.alias[measure_key],
          data: []
        }
      }

      for (var idx in response.data) {
        var item = response.data[idx]

        for (var key in item) {
          if (key == this.scheme.dimension) {
            data.dimension.data.push(item[key])
          }
          else {
            data.measures[key].data.push(item[key])
          }
        }
      }
      this.data = data

      this.status = "ready"
    }, function (response) {
      // error callback
      this.status = "error"
      console.log(response)
    });
  }
}

</script>
