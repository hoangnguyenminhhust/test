<template>
  <v-card
    class="mx-auto pa-2"
    color=""
    max-width="600"
    elevation="0"
  >
    <div> 
      <v-img
        :aspect-ratio="180 / 180"
        :src="s3Url + product.images[0]"
        style="cursor: pointer;"
        class="d-flex align-center justify-center"
        @click="$router.push({ path: `/product/${product._id}` })"
      >
        <div
          v-if="product.amount === 0"
          style="text-align: center; color: red"
        >
          <strong>Hết hàng</strong>
        </div>
      </v-img>
    </div>
    <v-card-text
      class="pt-6"
      style="position: relative"
    >
      <h3
        class="orange--text mb-1"
        style="font-size: 20px: padding: 3px; cursor: pointer;"
        @click="$router.push({ path: `/product/${product._id}` })"
      >
        {{ product.name }}
      </h3>
      <div
        class="font-weight-black mb-1"
        style="color: #C62828; font-size:16px; padding: 3px"
      >
        {{ product.price | formatPrice }}đ
      </div>
      <!-- <v-rating
        v-model="averageRate"
        background-color="grey"
        color="yellow accent-4"
        dense
        half-increments
        hover
        size="18"
        readonly
      /> -->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ["product"],
  data: () => ({
    rating: 4,
    productRates: [],
    averateRate: 0
  }),
  computed: {
    s3Url() {
      return this.$store.state.s3Url;
    },
    averageRate() {
      if (this.productRates) {
      let total = 0;
      this.productRates.forEach(r => {
        total += r.rate;
      });
      return total / this.productRates.length;
      } else {
        return 0
      }
    }
  },
  async created() {
    // this.setupEvenListner();
    // await this.$store.dispatch("product/getProductRating", {
    //   productId: this.product._id
    // });
  },
  methods: {
    setupEvenListner() {
      this.$store.subscribe(mutation => {
        if (mutation.type === "product/GET_RATING") {
          // console.log('hello')
          this.productRates = mutation.payload;
        }
      });
    },
    addToCart() {
      try {
        let products = [];
        let check = false;
        if (localStorage.getItem("cart")) {
          products = JSON.parse(localStorage.getItem("cart")).products;
        }
        products.forEach(r => {
          if (this.product._id === r.product._id) {
            alert("đã tồn tại");
            check = true;
          }
        });
        if (check) return;
        products.push({ product: this.product, quantity: 1 });
        const expiredTime = new Date().getTime() + 8600000 / 4;
        localStorage.setItem(
          "cart",
          JSON.stringify({
            products: products,
            expiredTime: expiredTime
          })
        );
        this.$store.commit("cart/ADD", { product: this.product, quantity: 1 });
        alert("Thêm vào giỏ hàng thành công");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
