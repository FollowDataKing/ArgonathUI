<template>
  <div class="input-group">
    <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
    <input v-if="model.type=='daterange'" type="text" class="form-control"
      v-filter-value="filterValue">
    <select v-if="model.type=='select'" class="form-control select2" style="width: 100%;"
      v-filter-value="filterValue">
      <option>All</option>
      <option v-for="(optionLabel, optionValue) in model.settings.options">{{optionLabel}}</option>
    </select>
    <span class="input-group-btn">
      <button type="button" class="btn btn-primary btn-flat"
        :disabled="!filterValue"
        @click.prevent="submit">
        <i class="fa fa-check"></i>
      </button>
      <button type="button" class="btn btn-danger btn-flat"
        @click.prevent="cancel">
        <i class="fa fa-close"></i>
      </button>
    </span>
</template>

<script>
require("daterangepicker/daterangepicker-bs3.min.css")
require("daterangepicker")
require("select2")

import moment from "moment"
import { uuid } from "src/utils/uuid.js"

export default {

  props: {
    model: Object,
    onChange: Function,        // The callback on the filter value changed
    onSubmit: Function,        // The callback on the filter value submitted
    onCancel: Function         // The callback on the filter editing cancelled
  },

  data () {
    return {
      filterValue: ""
    }
  },

  computed: {
    id () {
      return this.pid + "-" + "filter-value"
    }
  },

  ready() {
  },

  directives : {
    filterValue : {
      twoWay: true,
      bind: function () {
        var self = this;

        // Access the component from the directive
        var filter =  this.vm.$data.model
        console.log(filter)
        var filterType = filter.type


        // Initialize the input field via different filter type
        // If the filter type if date range
        if (filterType == 'daterange') {
          $(self.el).daterangepicker({
            ranges: {
              'Today': [moment(), moment()],
              'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              'Last 7 Days': [moment().subtract(6, 'days'), moment()],
              'Last 30 Days': [moment().subtract(29, 'days'), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
              'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
          });

          $(self.el).on('apply.daterangepicker', function(ev, picker) {
            self.set(self.el.value)
          });
        }
        else if (filterType == 'select') {
          $(self.el).select2()
          $(self.el).on('change', function() {
            var optionLabel = self.el.value
            var optionValue = filter.settings.options[optionLabel]
            self.set(optionValue)
          })
        }

        $(self.el).focus();
      },
      unbind: function () {
      },
      update: function (newVal, oldVal) {
      }
    }
  },

  watch: {
    filterValue(val, old) {
      this.onChange && val !== old ? this.onChange(val) : null
    },
  },

  methods: {
    submit() {
      (this.filterValue && this.onSubmit) ? this.onSubmit() : null
    },
    cancel() {
      this.onCancel ? this.onCancel() : null
    }
  }
}
</script>
