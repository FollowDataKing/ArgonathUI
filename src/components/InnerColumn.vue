<template>
  <div class="col-sm-{{ width }}">
    <Widget
      :model="widget">
    </Widget>
  </div>
</template>

<script>
import Widget from "./Widget.vue"

export default {
  name: "InnerColumn",

  components: {
    Widget
  },

  props: {
    model: Object
  },

  computed : {
    width: function () {
      return this.model.width || 12
    },
    widget: function () {
      return this.model.widget
    }
  }
}
</script>

<style>
</style>
