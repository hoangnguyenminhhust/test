import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import dayjs from 'dayjs';

Vue.config.productionTip = false;

Vue.component("vue-number-input", VueNumberInput);

Vue.filter("formatPrice", function(value) {
  if (value) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

Vue.filter('formatDate', function (value) {
  if (value)
  return dayjs(value).format('DD/MM/YYYY');
})

new Vue({
  router,
  store,
  vuetify,
  async created() {
    try {
      await this.$store.dispatch("user/checkAuth");
      this.$store.dispatch("cart/getCart");
      await this.$store.dispatch("user/getDeviceId");
    } catch (error) {
      console.log(error);
    }
  },
  render: h => h(App)
}).$mount("#app");
