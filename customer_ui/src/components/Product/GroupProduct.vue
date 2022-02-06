<template>
  <v-main>
    <v-container>
      <v-sheet
        width="120%"
        style="margin: auto;"
      >
        <v-slide-group
          class="pa-4"
          center-active
          show-arrows
        >
          <v-slide-item
            v-for="n in 15"
            :key="n"
          >
            <product-card style="padding: 10px" />
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
  </v-main>
</template>

<script>
import ProductCard from './ProductCard';
  export default {
    components: {
      ProductCard,
    },
    data: () => ({

    }),
  }
</script>