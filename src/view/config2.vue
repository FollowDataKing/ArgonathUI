<template>
  <div class="box box-info">
    <div class="box-header with-border">
      <i class="ion ion-clipboard"></i>
      <h3 class="box-title">Config dashboard by yourself</h3>
      <div class="box-tools pull-right">
        <button class="btn btn-primary btn-sm" @click="addNewWidget">Add Widget</button>
      </div>
    </div>
    <div class="box-body" v-for="item in items">
      <config-item></config-item>
    </div>
    <div class="box-footer clearfix">
      <div class="box-tools pull-right">
        <button class="btn btn-primary" @click="confirmConfig">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import ConfigItem from '../components/config-item'
export default {
  data () {
    return {
      align: 'center',
      items: []
    }
  },
  components: {
    Waterfall,
    WaterfallSlot,
    ConfigItem
  },
  methods: {
    addNewWidget () {
      var item = {
        width: 400,
        height: 200
      }
      this.items.push(item)
    },
    confirmConfig () {
      alert("confirm")
    }
  }
}
</script>

<style>
  .item-move {
    transition: all .5s cubic-bezier(.55,0,.1,1);
    -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
  }
</style>
