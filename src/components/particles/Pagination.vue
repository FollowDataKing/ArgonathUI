<template>
  <div>
    <ul class="pagination">
      <li :class="{ 'disabled': isPrevDisabled }"><a href="#">&laquo;</a></li>
      <li v-for="pageIdx in pageIndexs" :class="{ 'active': isActive(pageIdx) }">
        <a href="#">{{pageIdx}}</a>
      </li>
      <li :class="{ 'disabled': isNextDisabled }"><a href="#">&raquo;</a></li>
    </ul>
  </div>
</tempalte>

<script>
export default {
  props: {
    pages: Number
  },

  data () {
    return {
      currentPage: 1
    }
  },

  computed: {
    isPrevDisabled: function() {
      return this.curPage == 1
    },

    isNextDisabled: function() {
      return this.curPage == this.totalPages
    },

    isActive: function(pageIdx) {
      return pageIdx == this.currentPage
    },

    pageIndexs: function() {
      var range = (start, count) => [...Array(count)].map((_, i) => start + i)
      var indexStart = Math.floor((this.currentPage - 1) / this.indexSize) + 1
      return range(indexStart, this.indexSize)
    }
  }

  methods: {
    setPageTo: function (pageIdx) {
      if (pageIdx != this.currentPage) {
        this.currentPage = pageIdx
        this.$dispatch('setPageTo', this.currentPage)
      }
    }
  }
}
</script>
