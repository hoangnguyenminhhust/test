<template>
  <v-main>
    <v-container style="padding: 0px">
      <div
        class="text-xl-h4 text-left text-uppercase"
        style="padding: 10px"
      >
        {{ title }}
      </div>
      <div>
        <v-row style="margin: 0px">
          <v-col
            cols="6"
            sm="3"
          >
            <product-card />
          </v-col>
          <v-col
            cols="6"
            sm="3"
          >
            <product-card />
          </v-col>
          <v-col
            cols="6"
            sm="3"
          >
            <product-card />
          </v-col>
          <v-col
            cols="6"
            sm="3"
          >
            <product-card />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import ProductCard from '../Product/ProductCard'
export default {
  name: 'TopProduct',
  components: {
    ProductCard
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['title']
}
</script>