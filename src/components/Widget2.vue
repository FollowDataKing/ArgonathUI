<template>
  <div class="chart-wrapper">
    <div class="chart-title">
      Title of widget #{{id}}
    </div>
    <div :id="'w-' + id" class="chart-stage">
      <!-- <img v-if="type == 'placeholder'" data-src="holder.js/100%x{{ height }}/white"> -->
      <filter-panel :filter-options="filters" :on-filters-change="loadData" placeholder="Select filters ..."></filter-panel>
      <Loading v-if="status == 'loading'"></Loading>
      <div v-else>

        <Dtable
        :id="id"
        :title="title"
        :columns="columns"
        :records="data | applyFilter"></Dtable>
        <canvas v-if="type == 'chart'" id="myChart"></canvas>
      </div>
    </div>
    <div class="chart-notes">
      Notes about widget #{{id}}
    </div>
  </div>
</template>

<script>
// import Chart from "chart.js"
import Loading from "../particles/Loading.vue"
import Dtable from "../particles/Table.vue"
import FilterEditor from "../particles/FilterEditor.vue"
//import PathNav from "./particles/PathNav.vue"
import FilterPanel from "../particles/FilterPanel.vue"
//import PathNav from "../particles/PathNav.vue"

export default {
  props: {
    model: Object,
    id: String
  },

  data () {
    return {
      title: "Hello World",
      status: "loading",
      scheme: {
        alias: {
          create_time: "日期",
          city_code: "城市",
          shop_area_code: "商圈",
          shop_id: "店铺",
          BALANCE: "余额",
          ALIPAY: "支付宝",
          TENPAY: "微信",
          TENPAY2: "微信2",
          TOTAL: "总额",
        },
        drillers: ["year", "month", "date"],
        filters: [
          {
            keys: ["create_time"],
            type: "daterange",
            settings: {
              create_time: {
                date_format: 'YYYY-MM-DD'
              }
            }
          },
          {
            keys: ["city_code", "shop_area_code", "shop_id"],
            type: "select",
            settings: {
              city_code: {
                multiple: false,
                options: {
                  "杭州": 330100,
                  "上海": 310000
                }
              },
              shop_area_code: {
                multiple: false,
                option_api: {
                  url: "http://139.129.96.38:5001/api/v1.0/areas/{city_code}",
                  label: "shop_area_name",
                  value: "shop_area_id"
                }
              },
              shop_id: {
                multiple: false,
                option_api: {
                  url: "http://139.129.96.38:5001/api/v1.0/shops/{shop_area_code}",
                  label: "shop_name",
                  value: "shop_id"
                }
              }
            }
          }
        ],
        dimension: "create_time",
        measures: [ "BALANCE", "ALIPAY", "TENPAY", "TENPAY2", "TOTAL" ],
        postFilters: {
          create_time: "ts2date",
          BALANCE: {
            name: "currency",
            args: ["￥"]
          },
          ALIPAY: {
            name: "currency",
            args: ["￥"]
          },
          TENPAY: {
            name: "currency",
            args: ["￥"]
          },
          TENPAY2: {
            name: "currency",
            args: ["￥"]
          },
          TOTAL: {
            name: "currency",
            args: ["￥"]
          }
        }
      },
      data: { },
      drilled: []
    }
  },

  filters: {
    applyFilter (records) {
      var newRecords = []
      for (var recordIdx in records) {
        var record = records[recordIdx]
        var newRecord = {}

        for (var colName in record) {
          if (this.scheme.postFilters[colName]) {
            var postFilter = this.scheme.postFilters[colName]
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
    }
  },

  computed: {
    height: function () {
      return this.model.height || 120
    },
    type: function() {
      return this.model.type
    },
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
    Dtable,
    FilterEditor,
    FilterPanel
    //PathNav
  },

  ready() {
    this.loadData()
  },

  methods: {
    loadData (filters) {

      var dataUrl = this.model.api.url

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
      }, function (response) {
        // error callback
        this.status = "error"
        // console.log(response)
      });
    }
  },

  events: {
    'dblclickedOnTableCell': function (column, row) {
      if (column.key == this.scheme.dimension) {
        console.log("dblclicked on dimension: " + column.key)
      }
    }
  },
}

</script>
