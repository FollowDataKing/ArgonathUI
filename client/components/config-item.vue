<template>
  <div class="box box-info">
    <div class="box-header with-border">
      <i class="ion ion-clipboard"></i>
      <input type="text" placeholder="Set your widget title" v-model="title">
      {{title}}
      <input type="text" placeholder="Set your widget width" v-model="width">
      {{width}}
      <div class="box-tools pull-right">
        <label class="checkbox-inline">
          <input type="checkbox" value="line" v-model="components"> Add Line
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" value="bar" v-model="components"> Add Bar
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" value="pie" v-model="components"> Add Pie
        </label>
        <label class="checkbox-inline">
          <input type="checkbox" value="table" v-model="components"> Add Table
        </label>
      </div>
    </div>
    <div class="box-body">
      <textarea class="textarea" placeholder="Config Json" style="width: 100%; height: 125px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: "",
      width: 12,
      components: []
    }
  }
}
</script>
