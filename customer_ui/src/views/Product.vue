<template>
  <div>
    <!-- <banner /> -->
    <product />
  </div>
</template>

<script>
// import Banner from '../components/Home/Banner.vue'
import Product from '../components/Product/Product'
export default {
  components: {
    Product,
    // Banner
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth;
    },
  },
}
</script>