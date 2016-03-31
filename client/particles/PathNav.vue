<template>
<div>
  <ol v-if="path.length > 0" class="breadcrumb">
    <li v-for="token in path">
      <a href="#">{{token}}</a>
    </li>
  </ol>
</div>
</template>

<script>
export default {

  props: {
    path: {
      type: Array,
      default: function () { return [] }
    }
  },

  data() {
    return {
      selected: null,
      options: ['foo','bar','baz']
    }
  },
}
</script>
