<template>
  <div class="box box-info">
    <div class="box-header with-border">
      <i class="ion ion-clipboard"></i>
      <h3 class="box-title">Config dashboard by yourself</h3>
      <div class="box-tools pull-right">
        <button class="btn btn-primary btn-sm" @click="addNewWidget">Add Widget</button>
      </div>
    </div>
    <div class="box-body">
      <div class="gridster">
        <ul></ul>
      </div>
    </div>
    <div class="box-footer clearfix">
      <div class="box-tools pull-right">
        <button class="btn btn-primary" id="confirmConfig">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
require("bootstrap/dist/css/bootstrap.min.css")
require("gridster/dist/jquery.gridster.min.css")
require("gridster/dist/jquery.gridster.min.js")
export default {
  data () {
    return {
      gridster: null
    }
  },
  ready () {
    this.gridster = $(".gridster ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [140, 140]
    }).data("gridster")
  },
  methods: {
    addNewWidget () {
      console.log(this.gridster.add_widget)
      this.gridster.add_widget('<li>The HTML of the widget...</li>', 1, 1)
    }
  }
}
</script>

<style media="screen">
.gridster * {
  margin:0;
  padding:0;
}

ul {
  list-style-type: none;
}


/*/
/* demo
/*/


body {
    font-size: 16px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #444;
    margin: 30px 40px;
}

.controls {
    margin-bottom: 20px;
}

/*/
/* gridster
/*/

.gridster ul {
    background-color: #EFEFEF;
}

.gridster li {
    font-size: 1em;
    font-weight: bold;
    text-align: center;
    line-height: 100%;
}


.gridster {
    margin: 0 auto;

    opacity: .8;

    -webkit-transition: opacity .6s;
    -moz-transition: opacity .6s;
    -o-transition: opacity .6s;
    -ms-transition: opacity .6s;
    transition: opacity .6s;
}

.gridster .gs-w {
    background: #DDD;
    cursor: pointer;
}

.gridster .player {
    background: #BBB;
}


.gridster .preview-holder {
    border: none!important;
    background: red!important;
}

</style>
