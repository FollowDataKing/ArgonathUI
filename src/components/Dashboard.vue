<template>
  <div>
    <Container
      v-for="row in rows"
      :model="row"
      :id="'' + $index">
    </Container>
  </div>
</template>

<script>
  import Container from "./Container.vue"
  export default {
    name: "Dashboard",
    components: {
      Container
    },
    data () {
      return {
        rows : [
          {
            columns: [
              {
                width: 12,
                widget: {
                  height: 200,
                  type: "table",
                  api: {
                    proto: "http",
                    url: "http://139.129.96.38:1060/statistics/query/payment"
                  }
                }
              }
            ]
          },
        ]
      }
    },
  }
  </script>

  <style>
  </style>
