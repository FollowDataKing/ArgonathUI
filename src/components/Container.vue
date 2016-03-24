<template>
  <div :id="'r-' + id" class="row" v-if="columns.length > 0">
    <Container
      v-for="column in columns"
      :model="column"
      :id="id + '-' + $index">
    </Container>
  </div>
  <div :id="'c-' + id" class="col-sm-{{ width }}" v-else>
    <div v-if="rows.length > 0">
      <Container
        v-for="row in rows"
        :model="row"
        :id="id + '-' + $index">
      </Container>
    </div>
    <div v-if="widget">
      <Widget
        :model="widget"
        :id="id">
      </Widget>
    </div>
  </div>
</template>

<script>
import Widget from "./Widget2.vue"

export default {
  name: "Container",

  components: {
    Widget
  },

  props: {
    model: Object,
    id: String
  },

  computed: {
    columns: function () {
      return this.model.columns || []
    },

    rows: function () {
      return this.model.rows || []
    },

    widget: function () {
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
