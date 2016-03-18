<template>
  <div class="container-fluid">
    <Container
      v-for="row in rows"
      :model="row">
    </Container>
   <hr>
   <p class="small text-muted">This is a status bar</a></p>
 </div>
</template>

<script>
  import Container from "./Container.vue"

  export default {
    components: {
      Container
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
                    columns: [
                      {
                        width: 12,
                        widget: {
                          height: 120
                        }
                      }
                    ]
                  },
                  {
                    columns: [
                      {
                        width: 12,
                        widget: {
                          height: 120
                        }
                      }
                    ]
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
                    columns: [
                      {
                        width: 12,
                        widget: {
                          height: 120
                        }
                      }
                    ]
                  },
                  {
                    columns: [
                      {
                        width: 12,
                        widget: {
                          height: 120
                        }
                      }
                    ]
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
                  height: 120
                }
              },
              {
                width: 6,
                widget: {
                  height: 120
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
