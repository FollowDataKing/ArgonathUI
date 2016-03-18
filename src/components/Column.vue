<template>
  <div class="col-sm-{{ width }}">
    <div v-if="rows && rows.length > 0">
      <Row
        v-for="row in rows"
        :columns="row.columns">
      </Row>
    </div>
    <Widget v-else
      :height="widget.height">
    </Widget>
  </div>
</template>

<script>
import Row from "./Row.vue"
import Widget from "./Widget.vue"

export default {
  name: "Column",

  components: {
    Row,
    Widget
  },

  // props () {
  //   return {
  //   width: {
  //     type: Number,
  //     default: 12
  //   },
  //   rows: {
  //     type: Array,
  //     default: []
  //   },
  //   widget: {
  //     type: Object,
  //     default: undefined
  //   }
  // }
  // },

  props : {
    width: {
      type: Number,
      default: 12
    },
    rows: {
      type: Array,
      default: function () {[]}
    },
    widget: {
      type: Object,
      default: function () {undefined}
    }
  },

  ready() {
    console.log(this.rows)
  }
}
</script>

<style>
</style>
