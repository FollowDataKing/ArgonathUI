<template>
  <div class="row">
    <Column
      v-for="column in columns"
      :width="column.width"
      :rows="column.rows"
      :widget="column.widget">
    </Column>
  </div>
</template>

<script>
import Column from "./Column.vue"

export default {
  name: "Row",

  components: {
    Column
  },

  props: {
    columns: Array
  },
}
</script>

<style>
</style>
