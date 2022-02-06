<template>
  <v-main style="background-color: #ECEFF1;">
    <v-container style="height: 500px;">
      <div
        v-if="checkOrderStatus"
        style="font-size: 16px; margin-top: 200px"
        class="center"
      >
        <p>Đặt hàng thành công</p>
        <a href="/">Về trang chủ</a>
      </div>
      <div
        v-else
        style="font-size: 16px; margin-top: 200px"
        class="center"
      >
        <p>Đặt hàng không thành công</p>
        <a href="/">Về trang chủ</a>
      </div>
    </v-container>
  </v-main>
</template>

<script>

export default {
  data: () => ({
    responseCode: "",
    transactionCode: ""
  }),
  computed: {
    checkOrderStatus() {
      return this.responseCode === "00";
    }
  },
  async created() {
    if (this.$route.query.vnp_ResponseCode) {

      this.responseCode = this.$route.query.vnp_ResponseCode;
      this.transactionCode = this.$route.query.vnp_TxnRef;
      if (this.responseCode === "00") {
        await this.$store.dispatch('order/updateOrder', {
          orderId: this.transactionCode,
          payment: true,
        })
        localStorage.removeItem("cart");
        this.$store.commit("cart/RESET_CART");
        this.$router.push({ path: "/order-success" });
      } else {
        await this.$store.dispatch("order/deleteOrder", { orderId: this.transactionCode });
      }
    } else {
      this.responseCode = "00"
      localStorage.removeItem("cart");
      this.$store.commit("cart/RESET_CART");
    }
  }
};
</script>

<style>
.center {
  margin: auto;
  padding: 10px;
  text-align: center;
  vertical-align: middle;
}
</style>
