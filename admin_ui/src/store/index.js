import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import employee from './modules/employee'
import category from './modules/category'
import file from './modules/file'
import product from './modules/product'
import order from './modules/order'
import location from './modules/location'
import customer from './modules/customer'
import banner from './modules/banner'
import dashboard from './modules/dashboard';
import { setCurrentLanguage } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    changeLang(state, payload) {
      app.$i18n.locale = payload
      setCurrentLanguage(payload);
    }
  },
  actions: {
    setLang({ commit }, payload) {
      commit('changeLang', payload)
    }
  },
  modules: {
    menu,
    user,
    employee,
    file,
    category,
    product,
    order,
    location,
    customer,
    banner,
    dashboard,
  }
})
