<template>
  <div>
    <ul class="pagination">
      <li :class="{ 'disabled': isPrevDisabled() }"
        @click="setPageTo(currentPage - 1)">
        <a href="#">&laquo;</a>
      </li>
      <li v-for="pageIdx in pageIndexs"
        :class="{ 'active': isActive(pageIdx) }"
        @click="setPageTo(pageIdx)">
        <a href="#">{{pageIdx}}</a>
      </li>
      <li :class="{ 'disabled': isNextDisabled() }"
        @click="setPageTo(currentPage + 1)">
        <a href="#">&raquo;</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      indexSize: Number,
      totalPages: Number
    },

    data () {
      return {
        currentPage: 1
      }
    },

    computed: {
      pageIndexs: function() {
        var range = (start, count) => [...Array(count)].map((_, i) => start + i)
        var indexStart = Math.floor((this.currentPage - 1) / this.indexSize) * this.indexSize + 1
        return range(indexStart, Math.min(this.indexSize, this.totalPages - indexStart + 1))
      }
    },

    methods: {
      setPageTo: function (pageIdx) {
        if (pageIdx != this.currentPage && pageIdx <= this.totalPages && pageIdx >= 1) {
          this.currentPage = pageIdx
          this.$dispatch('setPageTo', this.currentPage)
        }
      },
      isActive: function(pageIdx) {
        return pageIdx == this.currentPage
      },
      isPrevDisabled: function() {
        return this.currentPage == 1
      },
      isNextDisabled: function() {
        return this.currentPage == this.totalPages
      },
    }
  }
</script>
