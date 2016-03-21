<template>
  <div class="container-fluid">
    <Container
      v-for="row in rows"
      :model="row"
      :id="'' + $index">
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
                width: 12,
                widget: {
                  height: 200,
                  type: "table"
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
