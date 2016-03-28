<template>
  <div class="input-group">
    <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
    <!-- <input type="text" placeholder="Type Message ..." class="form-control"> -->
    <input type="text" class="form-control"
      v-filter-value="filterValue">
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
require("daterangepicker/daterangepicker.js")

import moment from "moment"
import { uuid } from "src/utils/uuid.js"

export default {

  props: {
    pid: {
      type: String,
      default: uuid(8,16)
    },
    filterType: {
      type: String,
      default: 'text'
    },
    onChange: Function,
    onSubmit: Function,
    onCancel: Function
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

        var filterType = this.vm.$data.filterType

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
