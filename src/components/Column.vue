<template>
  <div class="col-sm-{{ width }}">
    <div v-if="rows && rows.length > 0">
      <inner-row
        v-for="row in rows"
        :model="row">
      </inner-row>
    </div>
    <Widget v-else
      :model="widget">
    </Widget>
  </div>
</template>

<script>
// import Row from "./Row.vue"
import InnerRow from "./InnerRow.vue"
import Widget from "./Widget.vue"

export default {
  name: "Column",

  components: {
    // Row,
    InnerRow,
    Widget
  },

  props:{
    model: Object
  },

  computed: {
    width: function () {
      return this.model.width || 12
    },
    rows: function () {
      return this.model.rows || []
    },
    widget: function () {
      return this.model.widget
    }
  },

  ready() {
    console.log("------------------------")
    console.log(this.model)
    console.log("------------------------")
  },
}
</script>

<style>
</style>
