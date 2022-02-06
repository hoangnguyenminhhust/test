<template>
  <div>
    <v-card
      elevation="0"
    >
      <div class="d-flex justify-space-between">
        <div class="d-flex flex-row">
          <div>
            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-img :src="s3Url + product.images[0]" />
            </v-avatar>
          </div>
          <div
            style="padding: 10px; font-size: 16px"
          >
            <div>
              <p>{{ product.name }}</p>
            </div>
            <div
              class="font-weight-black mb-1"
              style="color: #C62828; font-size:16px;"
            >
              {{ product.price | formatPrice }}đ
            </div>
          </div>
        </div>
        <div
          style="padding: 10px"
          class="d-flex align-center"
        >
          <div class="d-flex align-center">
            <vue-number-input
              v-model="quantity"
              size="small"
              inline
              controls
              center
              :min="1"
              :max="product.amount"
              style="max-width: 100px"
              @click="handler(product._id, quantity)"
            />
            <v-btn
              height="31px"
              style="margin-left: 10px"
              text
              icon
              color="red"
              @click="deleteProduct(product._id)"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
          <div>
            <v-card />
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ["product", "changeQuantity", "quantityCard"],
  data: () => ({
    quantity: 1
  }),
  computed: {
    s3Url() {
      return this.$store.state.s3Url;
    },
    products() {
      return this.$store.state.cart.cartProduct
    }
  },
  created() {
    this.quantity = this.quantityCard;
  },
  methods: {
    deleteProduct(productId) {
      const value = confirm("Bạn có muốn xoá?");
      if (value) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        cart.products = this.products.filter(r => r.product._id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        this.$store.commit("cart/MINUS", productId);
      }
    },
    handler(productId, quantity) {
      this.changeQuantity(productId, quantity)
    }
  }
};
</script>
