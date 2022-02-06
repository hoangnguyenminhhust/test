<template>
  <v-main>
    <v-container>
      <v-breadcrumbs
        :items="links"
        style="padding: 0px; color: black"
      />
      <v-row style="margin-top: 20px;">
        <v-col
          class="listColumn"
          cols="12"
          md="3"
        >
          <v-card
            class="mx-auto"
            max-width="300"
            tile
            elevation="0"
          >
            <v-list
              shaped
              color="blue-grey lighten-5"
            >
              <v-subheader
                style="font-size: 14px"
                class="text-uppercase"
              >
                Danh mục sản phẩm
              </v-subheader>
              <v-list-item-group
                v-model="selectedItem"
                color="primary"
              >
                <v-list-item
                  v-for="(category, i) in categories"
                  :key="i"
                  :to="`/category/${category._id}`"
                  @click="loadProduct(category._id)"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      style="font-size: 16px"
                      class="text-uppercase"
                    >
                      {{ category.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="9"
        >
          <div class="filterProduct">
            <v-btn
              depressed
              small
              style="margin-right: 5px"
              @click="findByPrice(null, null)"
            >
              Tất cả
            </v-btn>
            <v-btn
              depressed
              small
              style="margin-right: 5px"
              @click="findByPrice(null, 10000000)"
            >
              Dưới 10 triệu
            </v-btn>
            <v-btn
              depressed
              small
              style="margin-right: 5px"
              @click="findByPrice(10000000, 20000000)"
            >
              10 - 20 triệu
            </v-btn>
            <v-btn
              depressed
              small
              style="margin-right: 5px"
              @click="findByPrice(20000000, null)"
            >
              Trên 20 triệu
            </v-btn>
          </div>
          <v-row style="margin-top: 20px">
            <v-col
              v-for="(product, i) in products"
              :key="i"
              cols="6"
              md="3"
            >
              <product-card :product="product" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ProductCard from './ProductCard.vue';
export default {
  components: {
    ProductCard
  },
  data: () => ({
    // w: window.innerWidth,
    // hiden: true,
    selectedItem: undefined,
    links: [
      {
        text: "Trang chủ",
        disabled: false,
        href: "/"
      },
      {
        text: "Sản phẩm",
        disabled: false,
        href: "/product"
      }
    ],
    items: [
      {
        icon: "mdi-wifi",
        text: "Giày nam"
      },
      {
        icon: "mdi-bluetooth",
        text: "Giày nữ"
      },
      {
        icon: "mdi-chart-donut",
        text: "Giày Đôi"
      }
    ],
  }),
  computed: {
    categories() {
      return this.$store.state.category.categories;
    },
    products() {
      return this.$store.state.product.products;
    }
  },
  // watch: {
  //   selectedItem: function(val) {
  //     console.log(val);
  // },
  // mounted() {
  //   window.onresize = () => {
  //     this.w = window.innerWidth;
  //   };
  // },
  async created() {
    await Promise.all([
      this.$store.dispatch('category/getAllCategory'), 
      this.$store.dispatch('product/getProductByCategory', { categoryId: this.$route.params.categoryId}),
    ])
    this.categories.forEach((r, i) => {
      if (r._id === this.$route.params.categoryId) {
        this.selectedItem = i;
        return;
      }
    })
  },
  methods: {
    async loadProduct(category_id) {
      try {
        await this.$store.dispatch('product/getProductByCategory', { categoryId: category_id });
      } catch (error) {
        alert('có lỗi xảy ra');
      }
    },
    async findByPrice(startPrice, endPrice) {
      try {
        await this.$store.dispatch('product/getProductByCategory', { categoryId: this.$route.params.categoryId, startPrice: startPrice, endPrice: endPrice })
      } catch (error) {
        console.log(error);
        alert('có lỗi xảy ra');
      }
    }
  }
};
</script>

<style>
@media only screen and (max-width: 968px) {
  .listColumn {
    display: none !important;
  }
}
</style>
