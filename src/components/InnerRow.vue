<template>
  <div class="row">
    <inner-column
      v-for="column in columns"
      :model="column">
    </inner-column>
  </div>
</template>

<script>
import InnerColumn from "./InnerColumn.vue"

export default {
  name: "InnerRow",

  components: {
    InnerColumn
  },

  props: {
    model: Object
  },

  computed: {
    columns: function () {
      return this.model.columns
    }
  }
}
</script>

<style>
</style>
