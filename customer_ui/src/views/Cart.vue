<template>
  <v-main style="background-color: #ECEFF1">
    <v-container>
      <v-breadcrumbs
        :items="items"
        style="margin-bottom: 30px; padding: 0px"
      />
      <v-row v-if="products && products.length > 0">
        <v-col
          cols="12"
          md="8"
        >
          <div>
            <div
              v-for="(item, i) in products"
              :key="i"
              style="margin-bottom: 10px"
            >
              <cart-card
                :product="item.product"
                :change-quantity="changeQuantity"
                :quantity-card="item.quantity"
              />
            </div>
            <!-- <v-card
          v-for="(product, i) in products"
          :key="i"
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
                style="width: 60%; padding: 10px; font-size: 16px"
                class="d-flex align-center"
              >
                <div>
                  <p>{{ product.name }}</p>
                </div>
              </div>
            </div>
            <div
              style="padding: 10px"
              class="d-flex align-center"
            >
              <div
                class="font-weight-black mb-1"
                style="color: #C62828; font-size:16px; padding: 20px; float: right"
              >
                {{ product.price | formatPrice }}đ
              </div>
              <div class="d-flex align-center">
                <vue-number-input
                  v-model="prouduct.productQuality"
                  size="small"
                  inline
                  controls
                  center
                  style="width: 100px; marin: 0px"
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
            </div>
          </div>
        </v-card> -->
          </div>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-card elevation="0">
            <div style="padding: 10px">
              <div
                class="d-flex justify-space-between"
                style="margin: 10px 0px"
              >
                <div class="subtitle-1">
                  Tạm tính
                </div>
                <div style="font-size: 16px; color: #C62828">
                  {{ totalPrice | formatPrice }}đ
                </div>
              </div>
              <v-divider />
              <br>
              <div
                class="d-flex justify-space-between"
                style="margin: 10px 0px"
              >
                <div class="subtitle-1">
                  Tổng
                </div>
                <div style="font-size: 16px; color: #C62828">
                  {{ totalPrice | formatPrice }}đ
                </div>
              </div>
              <div>
                <v-btn
                  color="warning"
                  width="100%"
                  to="/order"
                >
                  THANH TOÁN
                </v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import cartCard from "../components/Cart/cartCard";
export default {
  components: {
    cartCard
  },
  data: () => ({
    value: 0,
    items: [
      {
        text: "Trang chủ",
        disabled: false,
        href: "/"
      },
      {
        text: "Giỏ hàng",
        disabled: false,
        href: "/cart"
      }
    ],
  }),
  computed: {
    totalPrice() {
      let total = 0;
      this.products.forEach(r => {
        total += r.product.price * r.quantity;
      });
      return total;
    },
    products() {
      return this.$store.state.cart.cartProduct
    }
  },
  created() {
    // if (localStorage.getItem("cart")) {
    //   const cart = JSON.parse(localStorage.getItem("cart")).products;
    //   this.products = cart;
    // }
  },
  methods: {
    changeQuantity(productId, quantity) {
      this.products.forEach(r => {
        if (r.product._id === productId) {
          r.quantity = quantity;
          return;
        }
      });
      const expiredTime = new Date().getTime() + (8600000 / 4);
      localStorage.setItem("cart", JSON.stringify({
          products: this.products,
          expiredTime: expiredTime,
      }));
    }
  }
};
</script>
