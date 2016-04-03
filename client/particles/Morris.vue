<template>
  <div class="chart-responsive">
    <div class="chart" :id="id"></div>
    <!-- <div class="chart" id="zzzzz" :style="{width:width + 'px', height:height + 'px'}"></div> -->
  </div>
</template>

<script>
  var $ = require("jquery")
  require("morris.js/morris.css")
  require('imports?jQuery=jquery,Raphael=webpack-raphael!morris.js/morris.js');

  export default {
    props: {
      id: String,
      height: {
        type: Number,
        default: 300
      },
      width: {
        type: Number,
        default: 400
      },
      data: Array,
      columns: Array,
      type: {
        type: String,
        default: "line"
      }
    },
    data () {
      return {
        chart: undefined
      }
    },
    ready () {
      var morrisOption = {
        element: this.id,
        resize: true,
        data: this.data,
        xkey: this.columns[0].key,
        ykeys: this.columns.slice(1).map(function(col) { return col.key}),
        labels: this.columns.slice(1).map(function(col) { return col.label}),
        hideHover: 'auto'
      }

      switch (this.type) {
        case "line":
        this.chart = Morris.Line(morrisOption);
        break;
        case "bar":
        this.chart = Morris.Bar(morrisOption)
        break;
        case "pie":
        this.chart = Morris.Area(morrisOption)
        break;
      }

    },
  }
  </script>

  <style>
  </style>
