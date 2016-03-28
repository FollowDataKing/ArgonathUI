<template>
  <div class="box" :class="style">
    <div class="box-header with-border">
      <i class="ion ion-clipboard"></i>
      <h3 class="box-title">{{title}}</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse">
          <i class="fa fa-minus"></i>
        </button>
        <button type="button" class="btn btn-box-tool" data-widget="remove">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>
    <div class="box-body">
      Box Body
    </div>
    <div class="box-footer clearfix">
      Box Footer
    </div>
  </div>

</template>

<script>
export default {
  props: {
    style: {
      type: String,
      default: "box-info"
    },
    title: {
      type: String,
      default: "Widget"
    }
  }
}
</script>
