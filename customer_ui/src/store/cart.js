import Cookies from '../plugins/cookies';

const state = {
  cartCount: 0,
  cartProduct: [],
};

const getters = {};

const actions = {
  getCart({ commit }) {
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart.expiredTime < new Date().getTime()) {
        localStorage.removeItem('cart');
      } else {
        commit("GET_CART", { cartNumber: cart.products.length, products: cart.products });
      }
    } else {
      commit("GET_CART_NUMBER", 0);
    }
  }
};

const mutations = {
  GET_CART(state, payload) {
    state.cartCount = payload.cartNumber;
    state.cartProduct = payload.products;

  },
  GET_CART_NUMBER(state, payload) {
    state.cartCount = payload
  },
  ADD(state, payload) {
    state.cartCount = state.cartCount + 1
    state.cartProduct = [...state.cartProduct, payload]
  },
  MINUS(state, payload) {
    state.cartCount = state.cartCount - 1;
    state.cartProduct = state.cartProduct.filter(r => r.product._id !== payload);
  },
  RESET_CART() {
    state.cartCount = 0;
    state.cartProduct = [];
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};
