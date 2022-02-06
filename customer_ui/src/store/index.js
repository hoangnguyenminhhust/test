import Vue from 'vue'
import Vuex from 'vuex'
import product from './product'
import user from './user'
import cart from './cart'
import order from './order'
import category from './category'
import location from './location'
import banner from './banner'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appDrawer: false,
    windowWidth: window.innerWidth,
    s3Url: process.env.VUE_APP_S3_URL,
  },
  mutations: {
    TOGGLE_DRAWER (state, payload) {
        // console.log(state.appDrawer);
        state.appDrawer = !state.appDrawer;
    }
  },
  actions: {
    toggleDrawer ({ commit }) {
      commit('TOGGLE_DRAWER')
    }
  },
  modules: {
    product,
    user,
    cart,
    order,
    category,
    location,
    banner
  }
})
