import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

Vue.$cookies.config('1h');

export default Vue.$cookies;