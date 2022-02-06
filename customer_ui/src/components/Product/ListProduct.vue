<template>
  <v-main v-if="products">
    <v-container>
      <v-card elevation="0">
        <v-card-title class="text-uppercase">
          {{ title }}
        </v-card-title>
        <v-divider />
        <div>
          <v-row style="margin: 0px">
            <v-col
              v-for="(product, i) in products"
              :key="i"
              cols="6"
              sm="3"
            >
              <product-card :product="product" />
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import ProductCard from './ProductCard'
export default {
  name: 'TopProduct',
  components: {
    ProductCard
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['products', 'title']
}
</script>