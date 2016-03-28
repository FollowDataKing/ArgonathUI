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
        <canvas :id="id" :style="{ height: height + 'px', width: width + 'px' }"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  var Chart = require('chart.js')
  export default {
    data () {
      return {
        chartObj: null,
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
      this.chartObj = new Chart(chartCanvas)
      switch (this.chartType) {
        case 'line':
          this.chart = this.chartObj.Line(this.chartData);
          break;
        case 'bar':
          this.chart = this.chartObj.Bar(this.chartData);
          console.log(this.chart);
          break;
        case 'pie':
          this.chart = this.chartObj.Pie(this.chartData);
          break;
      }
    },
    methods: {
      checkout (e) {
        e.preventDefault()
        console.log(11111)
        //this.chart.clear()
        if (this.chartType === 'bar') {
          this.chartType = 'line'
          this.chart.clear()
          this.chartObj.Line(this.chartData)
        } else {
          this.chartType = 'bar'
          this.chart.clear()
          this.chartObj.Bar(this.chartData)
        }
      }
    }
  }
</script>
