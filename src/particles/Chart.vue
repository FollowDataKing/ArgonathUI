<template>
  <div class="box" :class="box-style">
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
        <canvas id="{{id}}" :style="{ height: height + 'px', width: width + 'px' }"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
    },
    props: {
      box-style: {
        type: String,
        default: 'box-info'
      },
      title: {
        type: String,
        default: ''
      },
      height: {
        type: Number,
        default: 250
      },
      width: {
        type: Number,
        default: 300
      },
      chart-type: {
        type: String,
        default: 'line' // line, bar, pie
      },
      chart-data: {
        type: Object,
        default: {}
      }
    },
    ready () {
      var chartCanvas = $(this.id).get(0).getContext("2d");
      var chart = new Chart(chartCanvas);

      switch (this.type) {
        case 'line':
          chart.Line(this.chart-data)
          break
        case 'bar':
          chart.Bar(this.chart-data)
          break
        case 'pie':
          chart.pie()
          break
      }
    }
  }
</script>
