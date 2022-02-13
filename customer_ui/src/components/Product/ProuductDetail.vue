<template>
  <v-main style="background-color: #eceff1">
    <v-container>
      <v-breadcrumbs :items="items" class="ma-1" style="padding: 0px" />
      <v-card style="mt-1" elevation="0">
        <v-card-title
          ><v-icon>mdi-antenna</v-icon>{{ product.name }}</v-card-title
        >
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col md="6" cols="12">
              <div style="margin: 50px 0px">
                <!-- <v-img
                  v-if="product.images && Array.isArray(product.images)"
                  :src="s3Url + product.images[0]"
                  width="500px"
                  height="300px"
                /> -->
                <!-- <v-carousel
                  hide-delimiters
                  style="max-width: 500px; max-height: 500px"
                >
                  <v-carousel-item
                    v-for="(image,i) in product.images"
                    :key="i"
                    :src="s3Url + image"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                    height="300"
                  />
                </v-carousel> -->
                <v-card flat tile>
                  <v-window v-model="onboarding" reverse>
                    <v-window-item
                      v-for="(image, n) in product.images"
                      :key="`card-${n}`"
                    >
                      <v-card elevation="0">
                        <div>
                          <v-img
                            :src="s3Url + image"
                            :aspect-ratio="1"
                            style="display: block; width: 500px; height: 500px"
                            class="d-flex align-center justify-center"
                          >
                            <div
                              v-if="product.amount === 0"
                              style="text-align: center; color: red"
                            >
                              <strong style="font-size: 30px">Hết hàng</strong>
                            </div>
                          </v-img>
                        </div>
                      </v-card>
                    </v-window-item>
                  </v-window>

                  <v-card-actions
                    class="justify-space-between"
                    style="width: 500px"
                  >
                    <v-btn text @click="prev">
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-item-group
                      v-if="product.images && Array.isArray(product.images)"
                      v-model="onboarding"
                      class="text-center"
                      mandatory
                    >
                      <v-item
                        v-for="n in product.images.length"
                        :key="`btn-${n}`"
                        v-slot="{ active, toggle }"
                      >
                        <v-btn :input-value="active" icon @click="toggle">
                          <v-icon>mdi-record</v-icon>
                        </v-btn>
                      </v-item>
                    </v-item-group>
                    <v-btn text @click="next">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <!-- <v-row class="d-flex justify-center">
                  <v-col
                    v-for="(image, i) in product.images"
                    :key="i"
                    class="d-flex child-flex"
                    cols="4"
                  >
                    <v-img
                      :src="s3Url + image"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    />
                  </v-col>
                </v-row> -->
              </div>
            </v-col>
            <!-- <v-divider vertical /> -->
            <v-col md="6" cols="12">
              <div>
                <p>Mã sản phẩm: {{ product._id }}</p>
              </div>
              <div class="d-flex flex-row">
                <p>Đánh giá:</p>
                <v-rating
                  v-model="productRateAverage"
                  background-color="amber"
                  color="amber"
                  dense
                  half-increments
                  hover
                  size="18"
                  readonly
                />
              </div>
              <div>
                <p>
                  Lượt xem: <a>{{ product.views }}</a>
                </p>
              </div>
              <v-divider />
              <br />
              <div>
                <p class="display-1 font-weight-black">
                  {{ product.price | formatPrice }}đ
                </p>
              </div>
              <v-divider />
              <br />
              <div class="d-flex flex-row">
                <div style="margin-right: 20px">
                  <span class="font-weight-black">Số Lượng:</span>
                </div>
                <div>
                  <vue-number-input
                    v-model="value"
                    placeholder="Small"
                    size="small"
                    inline
                    controls
                    :disabled="product.amount === 0"
                    center
                    style="width: 100px; margin-right: 20px"
                  />
                </div>
                <div>
                  <v-btn
                    height="31px"
                    :disabled="product.amount === 0"
                    @click="addToCart"
                  >
                    <v-icon left> mdi-cart </v-icon>
                    Thêm vào giỏ hàng
                  </v-btn>
                </div>
              </div>
              <div class="my-2">
                <v-btn
                  color="warning"
                  dark
                  width="100%"
                  height="50px"
                  :disabled="product.amount === 0"
                  @click="buy"
                >
                  Mua ngay
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card color="basil" style="margin-top: 50px" elevation="0">
        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
          <v-tab v-for="item in tabs" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>
                <div v-html="description" />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card color="basil" flat>
              <v-card-text>
                <v-row
                  v-for="(property, i) in product.properties"
                  :key="i"
                  no-gutters
                >
                  <v-col cols="3">
                    <v-card class="pa-2" outlined tile color="#ECEFF1">
                      {{ property.key }}
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card class="pa-2" outlined tile>
                      {{ property.value }}
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <v-card v-if="productRates" style="margin-top: 50px" elevation="0">
        <v-card-title>Đánh giá {{ product.name }}</v-card-title>
        <v-card-text>
          <div>
            <div class="d-flex flex-row">
              <div class="d-flex align-center" style="margin: 10px">
                <div v-if="productRateAverage">
                  <span style="font-size: 25px; color: #ff9800">{{
                    productRateAverage
                  }}</span>
                </div>
              </div>
              <v-rating
                v-model="productRateAverage"
                background-color="orange lighten-3"
                color="orange"
                medium
                readonly
                half-increments
                style="margin: 10px"
              />
              <div class="d-flex align-center" style="margin: 10px">
                <div>
                  <span style="font-size: 18"
                    >{{ productRates.length }} Đánh giá</span
                  >
                </div>
              </div>
            </div>
            <v-row>
              <v-col cols="10" md="4">
                <div
                  v-for="(item, i) in filterRate"
                  :key="i"
                  style="padding: 0px 10px"
                >
                  <div class="d-flex flex-row align-center">
                    <div class="d-flex align-center">
                      <span style="font-size: 20px">{{ item._id.rate }}</span>
                      <v-btn icon color="amber" small>
                        <v-icon>mdi-star</v-icon>
                      </v-btn>
                    </div>
                    <v-progress-linear
                      :value="parseInt((item.count / totalRates) * 100)"
                      color="amber"
                      style="margin: 10px"
                    />
                    <div class="d-flex align-center">
                      <span style="font-size: 16px; color: #ff9800"
                        >{{ parseInt((item.count / totalRates) * 100) }}%</span
                      >
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                style="padding: 0px 10px"
                class="d-flex justify-center"
                cols="12"
                md="4"
              >
                <v-btn
                  outlined
                  color="indigo"
                  width="90%"
                  style="margin: 10px 0px"
                  @click="openRateDialog()"
                >
                  Viết đánh giá
                </v-btn>
              </v-col>
            </v-row>
            <div
              v-for="rate in productRates"
              :key="rate._id"
              style="margin: 10px 0px"
            >
              <v-divider />
              <rating
                :name="rate.customer.fullname"
                :content="rate.content"
                :created-at="rate.created_at"
              />
            </div>
            <div v-if="productRates.length > 0">
              <v-divider />
              <div style="margin: 10px 0px">
                <v-pagination
                  v-model="page"
                  :length="Math.ceil(totalRates / 3)"
                />
              </div>
            </div>
            <!-- <div style="width: 40%; margin: 10px">
              <v-row>
                <v-col>
                </v-col>
              </v-row>
            </div> -->
          </div>
        </v-card-text>
      </v-card>
      <v-card v-if="recommendProducts.length > 0" elevation="0">
        <recommend-products
          style="margin-top: 20px; padding: 0px"
          title="Sản phẩm bạn có thể quan tâm"
          :products="recommendProducts"
        />
      </v-card>
      <v-dialog v-model="rateDialog" persistent width="600px">
        <v-card>
          <v-card-title>Viết đánh giá</v-card-title>
          <v-card-text>
            <v-textarea
              v-model="content"
              name="input-7-4"
              label="Mời bạn viết cảm nhận..."
            />
            <div class="d-flex flex-row">
              <div class="d-flex align-center">
                Bạn cảm thấy sản phẩm thế nào?
              </div>
              <v-rating
                v-model="rating"
                background-color="amber"
                color="amber"
                large
                style="margin: 10px"
              />
            </div>
            <div>
              <v-form>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="customer.fullname"
                      label="Họ và tên*"
                      :error-messages="fullNameErrors"
                      required
                      @input="$v.customer.fullname.$touch()"
                      @blur="$v.customer.fullname.$touch()"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="customer.phone"
                      label="Số điện thoại*"
                      :error-messages="phoneErrors"
                      required
                      @input="$v.customer.phone.$touch()"
                      @blur="$v.customer.phone.$touch()"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="customer.email"
                      label="Email*"
                      :error-messages="emailErrors"
                      required
                      @input="$v.customer.email.$touch()"
                      @blur="$v.customer.email.$touch()"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="close()"> Hủy </v-btn>
            <v-btn color="blue darken-1" text @click="sendRate()">
              Gửi đánh giá
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import Rating from "../components/Rating.vue";
import RecommendProduct from "./ListProduct.vue";
import { validationMixin } from "vuelidate";
import { required, email, numeric } from "vuelidate/lib/validators";

export default {
  components: {
    rating: Rating,
    "recommend-products": RecommendProduct,
  },
  mixins: [validationMixin],
  data: () => ({
    tab: null,
    tabs: ["Mô tả", "Thông số kĩ thuật"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    items: [
      {
        text: "Trang chủ",
        disabled: false,
        href: "/",
      },
      {
        text: "Sản phẩm",
        disabled: false,
        href: "/product",
      },
    ],
    onboarding: 0,
    value: 0,
    rating: 0,
    rateDialog: false,
    customer: {
      fullname: "",
      phone: "",
      email: "",
    },
    content: "",
    page: 1,
  }),
  validations: {
    customer: {
      fullname: {
        required,
      },
      phone: {
        required,
        numeric,
      },
      email: {
        required,
        email,
      },
    },
  },
  computed: {
    product() {
      return this.$store.state.product.product;
    },
    s3Url() {
      return this.$store.state.s3Url;
    },
    description() {
      return this.$store.state.product.product.description;
    },
    products() {
      return this.$store.state.cart.cartProduct;
    },
    productRateAverage() {
      // console.log(typeof parseFloat(this.$store.getters['product/productRateAverage']).toFixed(1));
      return Number(
        parseFloat(this.$store.getters["product/productRateAverage"]).toFixed(1)
      );
    },
    productRates() {
      return this.$store.state.product.productRates;
    },
    fullNameErrors() {
      const errors = [];
      if (!this.$v.customer.fullname.$dirty) return errors;
      !this.$v.customer.fullname.required &&
        errors.push("Họ tên không được để trống");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.customer.email.$dirty) return errors;
      !this.$v.customer.email.email && errors.push("Email sai định dạng.");
      !this.$v.customer.email.required &&
        errors.push("Email không được để trống");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.customer.phone.$dirty) return errors;
      !this.$v.customer.phone.numeric && errors.push("Số điênh sai định dạng.");
      !this.$v.customer.phone.required &&
        errors.push("Số điện thoại không được để trống");
      return errors;
    },
    currentUser() {
      return this.$store.state.user.user;
    },
    filterRate() {
      return this.$store.state.product.filterRate;
    },
    totalRates() {
      return this.$store.state.product.totalRates;
    },
    recommendProducts() {
      return this.$store.state.product.recommendProductDetail.filter(
        (r) => r._id !== this.$route.params.productId
      );
    },
  },
  watch: {
    "$route.params.productId": async function (newId, oldId) {
      await Promise.all([
        await this.$store.dispatch("product/getProduct", {
          productId: newId,
        }),
        await this.$store.dispatch("product/updateProduct", {
          productId: newId,
          view: this.product.views + 1,
        }),
        await this.$store.dispatch("product/filterRateProduct", {
          productId: newId,
        }),
        await this.$store.dispatch("product/getProductRating", {
          productId: newId,
        }),
        await this.$store.dispatch("product/getRecommenProductDetail", {
          productId: newId,
        }),
      ]);
      window.scrollTo(0, 0);
    },
    page: async function (val) {
      try {
        await this.$store.dispatch("product/getProductRating", {
          productId: this.$route.params.productId,
          limit: 3,
          skip: val,
        });
      } catch (error) {
        alert("Có lỗi xảy ra vui lòng thử lại");
      }
    },
  },
  async created() {
    await Promise.all([
      await this.$store.dispatch("product/getProduct", {
        productId: this.$route.params.productId,
      }),
      await this.$store.dispatch("product/updateProduct", {
        productId: this.$route.params.productId,
        view: this.product.views + 1,
      }),
      await this.$store.dispatch("product/filterRateProduct", {
        productId: this.$route.params.productId,
      }),
      await this.$store.dispatch("product/getProductRating", {
        productId: this.$route.params.productId,
      }),
      await this.$store.dispatch("product/getRecommenProductDetail", {
        productId: this.$route.params.productId,
      }),
    ]);
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    },
    openRateDialog() {
      this.rateDialog = true;
      if (this.currentUser) {
        this.customer.fullname =
          this.currentUser.first_name + " " + this.currentUser.last_name;
        this.customer.phone = this.currentUser.phone;
        this.customer.email = this.currentUser.email;
      }
    },
    async changePage(page) {
      try {
        await this.$store.dispatch("product/filterRateProduct", {
          productId: this.$route.params.productId,
          limit: 3,
          skip: page,
        });
      } catch (error) {
        alert("Có lỗi xảy ra vui lòng thử lại");
      }
    },
    addToCart() {
      try {
        let products = [];
        let check = false;
        if (localStorage.getItem("cart")) {
          products = JSON.parse(localStorage.getItem("cart")).products;
        }
        products.forEach((r) => {
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
            expiredTime: expiredTime,
          })
        );
        this.$store.commit("cart/ADD", { product: this.product, quantity: 1 });
        alert("Thêm vào giỏ hàng thành công");
      } catch (error) {
        alert("Có lỗi xảy ra vui lòng thử lại");
      }
    },
    buy() {
      try {
        let products = [];
        let check = false;
        if (localStorage.getItem("cart")) {
          products = JSON.parse(localStorage.getItem("cart")).products;
        }
        products.forEach((r) => {
          if (this.product._id === r.product._id) {
            check = true;
          }
        });
        if (!check) {
          products.push({ product: this.product, quantity: 1 });
          const expiredTime = new Date().getTime() + 8600000 / 4;
          localStorage.setItem(
            "cart",
            JSON.stringify({
              products: products,
              expiredTime: expiredTime,
            })
          );
          this.$store.commit("cart/ADD", {
            product: this.product,
            quantity: 1,
          });
        }
        this.$router.push({ path: "/cart" });
      } catch (error) {
        console.log("Có lỗi xay ra vui lòng thử lại");
      }
    },
    close() {
      this.rateDialog = false;
    },
    async sendRate() {
      try {
        if (!this.rating) {
          alert("Bạn chưa đánh giá sao xin mời đánh giá");
          return;
        }
        this.$v.customer.$touch();
        if (!this.$v.customer.$anyError) {
          await this.$store.dispatch("product/rateProduct", {
            product_id: this.$route.params.productId,
            rate: this.rating,
            content: this.content,
            customer: this.customer,
            user_id: this.currentUser ? this.currentUser._id : null,
          });
          Promise.all([
            await this.$store.dispatch("product/getProductRating", {
              productId: this.$route.params.productId,
            }),
            await this.$store.dispatch("product/filterRateProduct", {
              productId: this.$route.params.productId,
            }),
          ]);
          this.rateDialog = false;
          this.content = "";
          this.customer.fullname = "";
          this.customer.phone = "";
          this.customer.email = "";
        }
      } catch (error) {
        alert("có lỗi xảy ra vui lòng thử lại");
      }
    },
  },
};
</script>
