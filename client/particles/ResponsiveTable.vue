<template>
<div id="responsive-tables">
  <table :id="'tab-' + id" class="table table-bordered table-striped cf">
    <thead class="cf">
      <tr>
        <th v-for="column in columns">{{column.label}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(recordIdx, record) in data">
        <td
          v-for="column in columns"
          data-title="{{column.label}}"
          @dblclick="dblclicked(column, record)">
          {{record[column.key]}}
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
var $ = require("jquery")
require("datatables.net-bs/css/dataTables.bootstrap.css")
require("datatables.net")
require("datatables.net-bs/js/dataTables.bootstrap.js")
export default {
  props: {
    id: String,
    columns: Array,
    data: Array
  },

  data () {
    return {
    }
  },
  ready () {
    $('#tab-' + this.id).DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": false
    });
  },
  methods: {
    dblclicked: function(column, row) {
      this.$dispatch('dblclickedOnTableCell', column, row)
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
