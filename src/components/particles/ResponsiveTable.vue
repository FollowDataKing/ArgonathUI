<template>
  <div id="responsive-tables">
    <table class="col-md-12 table-bordered table-striped table-condensed cf">
      <thead class="cf">
        <tr>
          <th>{{dimension.label}}</th>
          <th v-for="measure in measures">{{measure.label}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dimidx, dimval) in pagedDimensions">
          <td class="title" data-title="{{dimension.label}}">{{dimval}}</td>
          <td
            v-for="measure in measures"
            data-title="{{measure.label}}">
            {{measure.data[dimidx + startIndex]}}
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :index-size="indexSize" :total-pages="totalPages"></Pagination>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue"

export default {
  props: {
    dimension: Object,
    measures: Object
  },

  components: {
    Pagination
  },

  data () {
    return {
      itemsPerPage: 10,
      currentPage: 1
    }
  },

  computed: {
    startIndex: function () {
      return (this.currentPage - 1) * this.itemsPerPage
    },

    indexSize: function() {
      return Math.min(10, this.totalPages)
    },

    totalPages: function() {
      return Math.ceil(this.dimension.data.length / this.itemsPerPage)
    },

    pagedDimensions: function() {
      return this.dimension.data.slice(this.startIndex, this.startIndex + this.itemsPerPage - 1)
    }
  },

  events: {
    'setPageTo': function (newPage) {
      this.currentPage = newPage
    }
  }
}
</script>

<style>
@media only screen and (max-width: 800px) {

    /* Force table to not be like tables anymore */
	#responsive-tables table,
	#responsive-tables thead,
	#responsive-tables tbody,
	#responsive-tables th,
	#responsive-tables td,
	#responsive-tables tr {
		display: block;
	}

	/* Hide table headers (but not display: none;, for accessibility) */
	#responsive-tables thead tr {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	#responsive-tables tr { border: 1px solid #ccc; }

	#responsive-tables td {
		/* Behave  like a "row" */
		border: none;
		border-bottom: 1px solid #eee;
		position: relative;
		padding-left: 50%;
		white-space: normal;
		text-align:left;
	}

	#responsive-tables td:before {
		/* Now like a table header */
		position: absolute;
		/* Top/left values mimic padding */
		top: 6px;
		left: 6px;
		width: 45%;
		padding-right: 10px;
		white-space: nowrap;
		text-align:left;
		font-weight: bold;
	}

	/*
	Label the data
	*/
	#responsive-tables td:before { content: attr(data-title); }
}
</style>
