<template>
  <div class="box" :class="boxStyle">
    <div class="box-header with-border">
      <h3 class="box-title" v-if="title">{{title}}</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
      </div>
      <a v-if="chartType !== 'pie'" href="#" @click="checkout">checkout</a>
    </div>
    <div class="box-body">
      <div class="chart">
        <canvas :id="id" :style="{width:width + 'px', height:height + 'px'}"></canvas> <!--:style="{ height: height + 'px', width: width + 'px' }"-->
      </div>
    </div>
  </div>
</template>

<script>
  //var echarts = require('echarts')
  var Chart = require("chart.js")
  export default {
    data () {
      return {
        chart: null
      }
    },
    props: {
      id: {
        type: String
      },
      boxStyle: {
        type: String,
        default: 'box-info'
      },
      title: {
        type: String,
        default: 'This is Title'
      },
      height: {
        type: Number,
        default: 300
      },
      width: {
        type: Number,
        default: 400
      },
      chartType: {
        type: String,
        default: 'line' // line, bar, pie
      },
      chartData: {
        type: Object,
        default: {}
      }
    },
    ready () {
      var chartCanvas = document.getElementById(this.id).getContext("2d")
      var chart = new Chart(chartCanvas)
      switch (this.chartType) {
        case "line":
          this.chart = chart.Line(this.chartData);
          break;
        case "bar":
          this.chart = chart.Bar(this.chartData);
          break;
        case "pie":
          this.chart = chart.Pie(this.chartData)
          break;
      }
    },
    methods: {
      checkout (e) {
        e.preventDefault()
        this.chart.destroy()
        var chartCanvas = document.getElementById(this.id).getContext("2d")
        var chart = new Chart(chartCanvas)
        if (this.chartType === 'bar') {
          this.chartType = 'line'
          this.chart = chart.Line(this.chartData)
        } else {
          this.chartType = 'bar'
          this.chart = chart.Bar(this.chartData)
        }
      }
    }
  }
</script>
