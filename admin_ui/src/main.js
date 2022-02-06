import Vue from 'vue'
import App from './App'

// BootstrapVue add
import BootstrapVue from 'bootstrap-vue'
// Router & Store add
import router from './router'
import store from './store'
// Multi Language Add
import en from './locales/en.json'
import es from './locales/es.json'
import VueI18n from 'vue-i18n'
import { firebaseConfig } from './constants/config'
// Notification Component Add
import Notifications from './components/Common/Notification'
// Breadcrumb Component Add
import Breadcrumb from './components/Common/Breadcrumb'
// RefreshButton Component Add
import RefreshButton from './components/Common/RefreshButton'
// Colxx Component Add
import Colxx from './components/Common/Colxx'
// Perfect Scrollbar Add
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import contentmenu from 'v-contextmenu'
import VueLineClamp from 'vue-line-clamp'
import VueScrollTo from 'vue-scrollto'
import firebase from 'firebase/app'
import 'firebase/auth'
import { getCurrentLanguage } from './utils'
import VueSweetalert2 from 'vue-sweetalert2';
import DateRangePicker from 'vue2-daterange-picker'
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import dayjs from 'dayjs';

Vue.use(BootstrapVue);
Vue.use(VueI18n);
const messages = { en: en, es: es };
const locale = getCurrentLanguage();
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'en',
  messages
});
Vue.use(VueSweetalert2);
Vue.use(Notifications);
Vue.use(require('vue-shortkey'));
Vue.use(contentmenu);
Vue.use(VueScrollTo);
Vue.use(VueLineClamp, {
  importCss: true
});

Vue.component('piaf-breadcrumb', Breadcrumb);
Vue.component('b-refresh-button', RefreshButton);
Vue.component('b-colxx', Colxx);
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar);
Vue.component('date-range-picker', DateRangePicker);


firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false

Vue.filter('formatPrice', function (value) {
  if (value)
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

Vue.filter('formatDate', function (value) {
  if (value)
  return dayjs(value).format('DD/MM/YYYY');
})

export default new Vue({
  i18n,
  router,
  store,
  async created() {
    await store.dispatch('checkAuth');
  },
  render: h => h(App)
}).$mount('#app')
