<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb heading="Dashboard" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xl="8" lg="12">
          <icon-cards-carousel></icon-cards-carousel>
          <b-row>
          <b-colxx md="12" class="mb-4">
            <sales-chart-card></sales-chart-card>
          </b-colxx>
        </b-row>
      </b-colxx>
            <b-colxx lg="12" xl="4" class="mb-4">
            <recent-orders></recent-orders>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import IconCardsCarousel from "../../../containers/app/dashboard/IconCardsCarousel";
import SalesChartCard from "../../../containers/app/dashboard/SalesChartCard";
import RecentOrders from "../../../containers/app/dashboard/RecentOrders";
  export default {
    components: {
      "icon-cards-carousel": IconCardsCarousel,
      "sales-chart-card": SalesChartCard,
      "recent-orders": RecentOrders,
    },
    data() {
      return {
        file: null
      }
    },
    methods: {
      clearFiles() {
        this.$refs['file-input'].reset()
      },
      upload() {
        this.$store.dispatch('uploadFile', this.file);
      }
    }
  }
</script>