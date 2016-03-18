<template>
  <div class="container-fluid">
    <Row
      v-for="row in rows"
      :columns="row.columns">
    </Row>
   <hr>
   <p class="small text-muted">This is a status bar</a></p>
 </div>
</template>

<script>
  import Row from "./Row.vue"

  export default {
    components: {
      Row
    },

    data () {
      return {
        rows : [
          {
            columns: [
              {
                width: 3,
                rows: [
                  {
                    columns: {
                      width: 12,
                      widget: {
                        height: 200
                      }
                    }
                  },
                  {
                    columns: {
                      width: 12,
                      widget: {
                        height: 200
                      }
                    }
                  }
                ]
              },
              {
                width: 6,
                widget: {
                  height: 325
                }
              },
              {
                width: 3,
                rows: [
                  {
                    columns: {
                      width: 12,
                      widget: {
                        height: 200
                      }
                    }
                  },
                  {
                    columns: {
                      width: 12,
                      widget: {
                        height: 200
                      }
                    }
                  }
                ]
              },
            ]
          },
          {
            columns: [
              {
                width: 6,
                widget: {
                  height: 200
                }
              },
              {
                width: 6,
                widget: {
                  height: 200
                }
              }
            ]
          }
        ]
      }
    },
  }
</script>

<style>
</style>
