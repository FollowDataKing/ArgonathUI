<template>
    <div class="chart-wrapper">
      <div class="chart-title">
        This is a sample title of widget #{{ index }}
      </div>
      <div class="chart-stage">
        <img data-src="holder.js/100%x{{ height }}/white">
      </div>
      <div class="chart-notes">
        This is a sample text region to describe widget #{{index}}.
      </div>
    </div>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 120
    },
    index: {
      type: Number,
      default: 1
    }
  }
}
</script>
