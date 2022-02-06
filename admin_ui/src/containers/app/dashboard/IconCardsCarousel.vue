<template>
  <div class="icon-cards-row">
    <glide-component :settings="glideIconsOption">
      <div class="icon-row-item">
        <b-card class="mb-4 text-center">
          <i class="iconsminds-clock" style="color: red" />
          <p class="card-text font-weight-semibold mb-0">Đơn chưa xử lý</p>
          <p class="lead text-center" style="font-size: 16px; color: red">{{ pendingOrders }}</p>
        </b-card>
      </div>
      <div class="icon-row-item">
        <b-card class="mb-4 text-center">
          <i class="iconsminds-basket-coins" style="color: green" />
          <p class="card-text font-weight-semibold mb-0">Đơn đã hoàn thành</p>
          <p class="lead text-center" style="font-size: 16px; color: green">{{ finishOrders }}</p>
        </b-card>
      </div>
      <div class="icon-row-item">
        <b-card class="mb-4 text-center">
          <i class="iconsminds-basket-coins" />
          <p class="card-text font-weight-semibold mb-0">Vốn</p>
          <p class="lead text-center" style="font-size: 16px">{{ capital | formatPrice }}đ</p>
        </b-card>
      </div>
      <div class="icon-row-item">
        <b-card class="mb-4 text-center">
          <i class="iconsminds-basket-coins" />
          <p class="card-text font-weight-semibold mb-0">Doanh thu</p>
          <p class="lead text-center" style="font-size: 16px">{{ revenue | formatPrice }}đ</p>
        </b-card>
      </div>
    </glide-component>
  </div>
</template>
<script>
import GlideComponent from "../../../components/Carousel/GlideComponent";
import IconCard from "../../../components/Cards/IconCard";

export default {
  components: {
    "glide-component": GlideComponent,
    "icon-card": IconCard
  },
  computed: {
    pendingOrders() {
      return this.$store.state.order.pendingOrders.length;
    },
    finishOrders() {
      return this.$store.state.order.finishOrders.length;
    },
    capital() {
      return this.$store.state.dashboard.capital;
    },
    revenue() {
      return this.$store.state.dashboard.revenue;
    }
  },
  data() {
    return {
      glideIconsOption: {
        gap: 5,
        perView: 4,
        type: "carousel",
        breakpoints: {
          320: {
            perView: 1
          },
          576: {
            perView: 2
          },
          1600: {
            perView: 3
          },
          1800: {
            perView: 4
          }
        },
        hideNav: true
      }
    };
  },
  async created() {
    await Promise.all([
      this.$store.dispatch('listPendingOrder'),
      this.$store.dispatch('listFinishOrder'),
      this.$store.dispatch('getCapital'),
      this.$store.dispatch('getRevenue'),
    ])
  }
};
</script>
