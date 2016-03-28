<template>
  <div class="box" :class="boxStyle">
    <div class="box-header with-border">
      <h3 class="box-title" v-if="title">{{title}}</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
      </div>
    </div>
    <div class="box-body">
      <div class="chart">
        <canvas :id="id" :style="{ height: height + 'px', width: width + 'px' }"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  var Chart = require('chart.js')
  export default {
    data () {
      return {}
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
        default: ''
      },
      height: {
        type: Number,
        default: 300
      },
      width: {
        type: Number,
        default: 300
      },
      chartType: {
        type: String,
        default: 'bar' // line, bar, pie
      },
      chartData: {
        type: Object,
        default: {}
      }
    },
    ready () {
      var chartCanvas = $("#"+this.id).get(0).getContext("2d")
      var chart = new Chart(chartCanvas)
      // console.log(chart)
      // console.log(this.chartData)
      switch (this.chartType) {
        case 'line':
          chart.Line(this.chartData);
          break;
        case 'bar':
          chart.Bar(this.chartData);
          break;
        case 'pie':
          chart.Pie(this.chartData);
          break;
      }
    }
  }
</script>
