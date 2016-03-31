<template>
<div>
  <div v-if = "config.length === 1">
    <Widget :config="config[0]" :id="'0'"></Widget>
  </div>
  <div v-if = "config.length === 0">
    Config The Dashboard First! 🐔🐔🐔!
  </div>
  <div v-if = "config.length > 1">
    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs pull-left">
        <li v-for="item in config" :class="$index===0?'active':''">
          <a :href="'#dashboard'+$index" data-toggle="tab">Dashboard#{{$index}}</a>
        </li>
      </ul>
      <div class="tab-content no-padding">
        <div
          v-for="item in config"
          class="chart tab-pane"
          :class="$index===0?'active':''"
          :id="'dashboard'+$index"
          style="position: relative;">
            <Widget :config="item" :id="''+$index"></Widget>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Widget from "../components/Widget"
  export default {
    components: {
      Widget
    },
    data () {
      return {
        config: []
      }
    },
    ready () {
      this.config = [{
      title: "This is a title",
      width: 12,
      vistypes: ['table', 'line', 'bar'],
      api: {
        proto: "http",
        url: "http://139.129.96.38:1060/statistics/query/payment?from_time=1445702400000&to_time=1446220800000"
      },
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
        postFilters: {table:{
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
        },
        bar: {
          create_time: "ts2date"
        },
        line: {
          create_time: "ts2date"
        }
        }
      }
    },
    {
    title: "This is a title",
    width: 12,
    components: [
      {type:'table',component:'ResponsiveTable'},
      {type:'line',component:'Chart'},
      {type:'bar',component:'Chart'}
    ],
    api: {
      proto: "http",
      url: "http://139.129.96.38:1060/statistics/query/payment?from_time=1445702400000&to_time=1446220800000"
    },
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
      postFilters: {table:{
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
      },
      bar: {
        create_time: "ts2date"
      },
      line: {
        create_time: "ts2date"
      }
      }
    }
  }]
    }
  }
  </script>
