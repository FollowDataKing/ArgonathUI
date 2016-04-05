<template>
  <div class="box" :class="style">
    <div class="box-header">
      <button @click="loadData">Reload</button>
    </div>
    <div class="box-body">
      <filter-panel  placeholder="Select filters ..."
        :filter-options="filters"
        :on-filters-change="loadData">
      </filter-panel>
      <path-nav :path="drilledLabels" v-if="drilled.length > 0" :item-activated="drillTo"></path-nav>
      <Loading v-if="status === 'loading'"></Loading>
      <Tabset v-else>
        <Tab v-for="vistype in config.vistypes"
          :header="vistype">
          <responsive-table v-if="vistype === 'table'" :data="localStore[vistype]" :columns="columns" :id="'table-' + id"></responsive-table>
          <Chart v-else :type="vistype" :data="localStore[vistype]" :columns="columns" :id="vistype + '-' + id"></Chart>
        </Tab>
      </Tabset>
    </div>
  </div>
</template>

<script>
import Loading from "../particles/Loading"
import FilterPanel from "../particles/FilterPanel"
import PathNav from "../particles/PathNav"
import ResponsiveTable from "../particles/ResponsiveTable"
import Chart from "../particles/Chart"
import Setting from "../settings/Settings"
import Tab from "../particles/Tab"
import Tabset from "../particles/Tabset"
import Morris from "../particles/Morris"

export default {
  props: {
    id: String,
    config: Object,
    style: {
      type: String,
      default: "box-info"
    },
  },

  data () {
    return {
      scheme: this.config.scheme,
      status: "loading",
      data: {},
      localStore: {},
      drilled: []
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

    drilledLabels: function () {
      var alias = this.scheme.alias
      return this.drilled.map(function (key) { return alias[key] })
    },

    /**
     * Get the filter map from the specified *scheme* section
     */
    filters: function () {
      var filters = {}
      for (let filterToken of this.scheme.filters) {
        var parentKey = undefined
        for (let filterKey of filterToken.keys) {
          var filter = {
            label: this.scheme.alias[filterKey],
            type: filterToken.type,
            settings: filterToken.settings[filterKey]
          }
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
    FilterPanel,
    PathNav,
    Chart,
    Tabset,
    Tab,
    Morris
  },

  ready() {
    this.loadData()
    console.log(this.data);
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
        // dataUrl += "?" + paramStr
        dataUrl += "&" + paramStr
      }
      console.log("access " + dataUrl)

      this.status = "loading"
      // GET request
      this.$http({url: dataUrl, method: 'GET'})
      .then(function (response) {
        // success callback
        this.data = response.data

        this.localStore['table'] = this.applyFilter(this.data, this.scheme['postFilters']['table'])
        this.localStore['line'] = this.applyFilter(this.data, this.scheme['postFilters']['line'])
        this.localStore['line'] = this.transDataForChart(this.localStore['line'])
        this.localStore['bar'] = this.applyFilter(this.data, this.scheme['postFilters']['bar'])
        this.localStore['bar'] = this.transDataForChart(this.localStore['bar'])

        this.status = "ready"

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

    drillTo (idx) {
      this.drilled = this.scheme.drillers.slice(0, idx + 1)
      console.log(this.drilled)
    }
  },

  events: {
    'dblclickedOnTableCell': function (column, row) {
      if (column.key == this.scheme.dimension) {
        console.log("dblclicked on dimension: " + column.key)
        this.drillTo(this.drilled.length)
      }
    }
  }
}
</script>
