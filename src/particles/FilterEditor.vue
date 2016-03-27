<template>
  <div class="input-group">
    <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
    <!-- <input type="text" placeholder="Type Message ..." class="form-control"> -->
    <input type="text" class="form-control pull-right" :id="id">
    <span class="input-group-btn">
      <button type="button" class="btn btn-primary btn-flat"><i class="fa fa-check"></i></button>
    </span>
  </div>
</template>

<script>
require("daterangepicker/daterangepicker-bs3.min.css")

// import moment from "moment"
require("daterangepicker/daterangepicker.js")

import { uuid } from "src/utils/uuid.js"

export default {

  props: {
    pid: {
      type: String,
      default: uuid(8,16)
    }
  },

  computed: {
    id () {
      return this.pid + "-" + "filter-value"
    }
  },

  ready() {
    jQuery("#" + this.id).daterangepicker();
  }
}
</script>
