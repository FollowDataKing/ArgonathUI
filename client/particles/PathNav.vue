<template>
  <ol v-if="path.length > 0" class="breadcrumb">
    <li v-for="token in path"
      :class="{active: $index == activeIndex}"
      @click.prevent="activateItem($index)">
      <a href="#" v-if="$index != activeIndex">{{token}}</a>
      <span v-else>
        {{token}}
      </span>
    </li>
  </ol>
</template>

<script>
export default {

  props: {
    path: {
      type: Array,
      default: function () { return [] }
    },

    activeIndex: {
      type: Number,
      default: 0
    },

    itemActivated: Function
  },

  methods: {
    activateItem (idx) {
      if (this.activeIndex != idx) {
        this.activeIndex = idx
        if (this.itemActivated) {
          this.itemActivated(idx)
        }
      }
    }
  }
}
</script>
