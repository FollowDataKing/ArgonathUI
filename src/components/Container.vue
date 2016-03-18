<template>
  <div class="row" v-if="columns.length > 0">
    <Container
      v-for="column in columns"
      :model="column">
    </Container>
  </div>
  <div class="col-sm-{{ width }}" v-else>
    <div v-if="rows.length > 0">
      <Container
        v-for="row in rows"
        :model="row">
      </Container>
    </div>
    <div v-if="widget">
      <Widget :model="widget">
      </Widget>
    </div>
  </div>
</template>

<script>
import Widget from "./Widget.vue"

export default {
  name: "Container",

  components: {
    Widget
  },

  props: {
    model: Object
  },

  computed: {
    columns: function () {
      if (this.model.columns) {
        console.log("---Row---")
        console.log(this.model)
      }
      return this.model.columns || []
    },

    rows: function () {
      if (this.model.rows) {
        console.log("---Column---")
        console.log(this.model)
      }
      return this.model.rows || []
    },

    widget: function () {
      if (this.model.widget) {
        console.log("---Widget-Column---")
        console.log(this.model)
      }
      return this.model.widget
    },

    width: function () {
      return this.model.width || 12
    }
  }
}
</script>

<style>
</style>
