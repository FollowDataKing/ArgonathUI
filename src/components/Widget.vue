<template>
    <div class="chart-wrapper">
      <div class="chart-title">
        Title of this widget
      </div>
      <div class="chart-stage">
        <img data-src="holder.js/100%x{{ height }}/white">
      </div>
      <div class="chart-notes">
        Notes about this widget
      </div>
    </div>
</template>

<script>
export default {
  props: {
    model: Object
  },
  computed: {
    height: function () {
      console.log("---Widget---")
      console.log(this.model)
      return this.model.height || 120
    },
    index: function () {
      return 1
    }
  }
}
</script>
