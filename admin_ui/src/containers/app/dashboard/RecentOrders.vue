<template>
  <b-card title="Sản phẩm bán chạy nhất">
    <b-refresh-button @click="refreshButtonClick" />
    <vue-perfect-scrollbar
      class="scroll dashboard-list-with-thumbs"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <recent-order-item
        v-for="(order, index) in topSellProducts"
        :order="order"
        detail-path="#"
        :key="index"
      />
    </vue-perfect-scrollbar>
  </b-card>
</template>
<script>
import RecentOrderItem from "../../../components/Listing/RecentOrderItem";

export default {
  components: {
    "recent-order-item": RecentOrderItem
  },
  data() {
    return {
      products
    };
  },
  computed: {
    topSellProducts() {
      return this.$store.state.dashboard.topSellProducts;
    }
  },
  methods: {
    refreshButtonClick() {
      console.log("refreshButtonClick");
    }
  },
  async created() {
    await this.$store.dispatch('getTopSellProduct');
  }
};
</script>
