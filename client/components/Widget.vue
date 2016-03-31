<template>
  <div class="box" :class="style">
    <div class="box-header with-border">
      <i class="ion ion-clipboard"></i>
      <h3 class="box-title">{{title}}</h3>
      <div class="btn-group pull-right" role="group" aria-label="...">
        <button type="button" class="btn btn-default" @click="check(item)" v-for="item in config.components">{{item['type']}}</button>
      </div>
    </div>
    <div class="box-body" :id="'w-' + id">
      <filter-panel :filter-options="filters" :on-filters-change="loadData" placeholder="Select filters ..."></filter-panel>
      <Loading v-if="status === 'loading'"></Loading>
      <div v-else>
        <component :is="currentView" :type="type" :data="localStore[type]" :id="'c-' + id" :columns="columns">
        </component>
      </div>
    </div>
  </div>

</template>

<script>
import Loading from "../particles/Loading.vue"
import FilterEditor from "../particles/FilterEditor.vue"
import FilterPanel from "../particles/FilterPanel.vue"
import ResponsiveTable from "../particles/ResponsiveTable.vue"
import Chart from "../particles/Chart.vue"
import Setting from "../settings/Settings"

export default {
  props: {
    style: {
      type: String,
      default: "box-info"
    },
    config: Object,
    id: String
  },
  data () {
    return {
      currentView: this.config.components[0]['component'],
      status: "loading",
      type:this.config.components[0]['type'],
      data: {},
      drilled: [],
      scheme: this.config.scheme,
      localStore: {}
    }
  },

  computed: {
    columns: function () {
      var cols = []
      cols.push({
        key: this.scheme.dimension,
        label: this.scheme.alias[this.scheme.dimension]
      })

      for (var idx in this.scheme.measures) {
        var measure_key = this.scheme.measures[idx]
        cols.push({
          key: measure_key,
          label: this.scheme.alias[measure_key]
        })
      }

      return cols
    },
    filters: function () {
      var filters = {}
      for (var filterIdx in this.scheme.filters) {
        var filterToken = this.scheme.filters[filterIdx]
        var parentKey = undefined
        for (var nameIdx in filterToken.keys) {
          var filterKey = filterToken.keys[nameIdx]
          var filter = { label: this.scheme.alias[filterKey], type: filterToken.type, settings: filterToken.settings[filterKey] }
          if (parentKey) {
            filter.depend = parentKey
          }
          parentKey = filterKey
          filters[filterKey] = filter
        }
      }
      return filters
    }
  },
  components: {
    Loading,
    ResponsiveTable,
    FilterEditor,
    FilterPanel,
    Chart
  },

  ready() {
    this.loadData()
  },

  methods: {
    loadData (filters) {
      var dataUrl = this.config.api.url

      if (filters && Object.keys(filters).length) {
        var paramStr = ""
        for (var filterKey in filters) {
          var filterVal = filters[filterKey]
          if (!filterVal) continue
          paramStr += filterKey + "=" + filterVal + "&"
        }
        paramStr = paramStr.slice(0, paramStr.length - 1)
        dataUrl += "?" + paramStr
      }
      console.log("access " + dataUrl)

      this.status = "loading"
      // GET request
      this.$http({url: dataUrl, method: 'GET'})
      .then(function (response) {
        // success callback
        this.data = response.data
        this.status = "ready"
        this.localStore = {}
        if (this.type === 'table') {
          this.localStore[this.type] = this.applyFilter(this.data, this.scheme['postFilters'][this.type])
        } else if (this.type === 'line' || this.type === 'bar') {
          this.localStore[this.type] = this.applyFilter(this.data, this.scheme['postFilters'][this.type])
          this.localStore[this.type] = this.transDataForChart(this.localStore[this.type])
        }
      }, function (response) {
        // error callback
        this.status = "error"
        // console.log(response)
      });
    },
    applyFilter (records, filters) {
      var newRecords = []

      for (var recordIdx in records) {
        var record = records[recordIdx]
        var newRecord = {}
        for (var colName in record) {
          if (filters[colName]) {
            var postFilter = filters[colName]
            var postFilterKey = postFilter
            var postFilterArgs = undefined

            if (typeof postFilter == "object") {
              postFilterKey = postFilter.name
              postFilterArgs = postFilter.args
            }

            // newRecord[colName] = (this.$options.filters[postFilter] || Vue.options.filters[postFilter])(record[colName])
            newRecord[colName] = postFilterArgs ? (this.$options.filters[postFilterKey])(record[colName], postFilterArgs[0])
              : (this.$options.filters[postFilterKey])(record[colName])
          } else {
            newRecord[colName] = record[colName]
          }
        }

        newRecords.push(newRecord)
      }
      return newRecords
    },
    transDataForChart (records) {
      let labels = []
      let data = {}
      for (let record of records) {
        for (let key in record) {
          if (key === this.columns[0]['key']) {
            labels.push(record[key])
          } else {
            if (data[key]) {
              data[key].push(record[key])
            } else {
              data[key] = []
              data[key].push(record[key])
            }
          }
        }
      }

      let datasets = []
      for (let index in this.columns) {
        if (index > 0) {
          datasets.push(Object.assign({
            label: this.columns[index]['label'],
            data: data[this.columns[index]['key']]
          },Setting.chartStyle[index-1]))
        }
      }

      return {
        labels: labels,
        datasets: datasets
      }
    },
    check (item) {
      this.currentView = item['component']
      this.type = item['type']
      if (!this.localStore[this.type]) {
        if (this.type === 'table') {
          this.localStore[this.type] = this.applyFilter(this.data, this.scheme['postFilters'][this.type])
        } else if (this.type === 'line' || this.type === 'bar') {
          this.localStore[this.type] = this.applyFilter(this.data, this.scheme['postFilters'][this.type])
          this.localStore[this.type] = this.transDataForChart(this.localStore[this.type])
        }
      }
    }
  },

  events: {
    'dblclickedOnTableCell': function (column, row) {
      if (column.key == this.scheme.dimension) {
        console.log("dblclicked on dimension: " + column.key)
      }
    }
  }
}
</script>
