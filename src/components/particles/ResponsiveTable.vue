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
      <tr v-for="(dimidx, dimval) in dimension.data">
        <td class="title" data-title="{{dimension.label}}">{{dimval}}</td>
        <td v-for="measure in measures" data-title="{{measure.label}}">{{measure.data[dimidx]}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    dimension: Object,
    measures: Object
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
