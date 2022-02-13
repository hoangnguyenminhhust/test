<template>
  <div style="background-color: #ECEFF1">
    <Banner
      class="banner"
    />
    <service class="banner" />
    <top-product
      :products="bestSell"
      :title="'top sản phẩm bán chạy'"
    />
    <new-product
      :products="products"
      :title="'top sản phẩm mới nhất'"
    />
    <!-- <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="n in 24"
            :key="n"
            cols="4"
          >
            <v-card height="200" />
          </v-col>
        </v-row>
      </v-container>
    </v-main> -->
    <!-- <v-footer app>
      footer
    </v-footer> -->
    <!-- <Footer /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from '../components/Home/Banner'
import TopProduct from '../components/Product/ListProduct'
import NewProduct from '../components/Product/ListProduct'
import Service from '../components/components/Service'
// import Footer from '../components/Footer/index'

export default {
  name: 'Home',
  components: {
    Banner,
    TopProduct,
    NewProduct,
    Service,
  },
  computed: {
    products() {
      return this.$store.state.product.products;
    },
    bestSell() {
      return this.$store.state.product.bestSell;
    }
  },
  async created() {
    Promise.all([
      await this.$store.dispatch('product/getAllProduct'),
      await this.$store.dispatch('product/bestSell')
    ])
  }
}
</script>


<style lang="scss">
  @media only screen and (max-width: 968px) {
    .banner {
      display: none !important;
    }
  }
</style>
