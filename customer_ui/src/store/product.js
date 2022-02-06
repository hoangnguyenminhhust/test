import axios from '../plugins/axios';

const state = {
  product: {},
  products: [],
  productRates: [],
  filterRate: [],
  totalRates: 0,
  bestSell: 0,
  recommendProductDetail: [],
}

const getters = {
  productRateAverage(state) {
    let total = 0;
    state.productRates.forEach(r => {
      total += r.rate;
    })
    return (total / state.productRates.length);
  }
}

const actions = {
  async getProduct ({ commit }, { productId }) {
    try {
      const { data } = await axios.get(`/product/${productId}`);
      commit('GET_PRODUCT', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAllProduct ({ commit }) {
    try {
      const { data } = await axios.get('/product');
      commit('GET_ALL_PRODUCT', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getProductByCategory({ commit }, { categoryId, startPrice, endPrice }) {
    try {
      const { data } = await axios.post('/product/get-product-by-category', { category_id: categoryId, startPrice: startPrice, endPrice: endPrice });
      commit('GET_PRODUCT_BY_CATEGORY', data)
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateProduct({ commit }, { productId, view }) {
    try {
      await axios.put(`/product/${productId}`, { views: view });
      commit('UPDATE_PRODUCT')
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getProductRating({ commit }, { productId, limit, skip }) {
    try {
      const { data } = await axios.get(`/rate/${productId}?limit=${limit}&skip=${skip}`);
      commit('GET_RATING', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async rateProduct({ commit }, payload) {
    try {
      const { data } = await axios.post('/rate', payload);
      commit('CREATE_RATING', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async filterRateProduct({ commit }, payload) {
    try {
      const { data } = await axios.post('/rate/filter-rate', { productId: payload.productId });
      commit('FILTER_RATE', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async bestSell({ commit }) {
    try {
      const { data } = await axios.post('/product/best-sell');
      commit('BEST_SELL', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getRecommenProductDetail({ commit }, payload) {
    try {
      const { data } = await axios(`/product/recommend/${payload.productId}`);
      commit('GET_RECOMMEND_PRODUCT_DETAIL', data);
    } catch (error) {
      
    }
  }
}

const mutations = {
  GET_RECOMMEND_PRODUCT_DETAIL(state, payload) {
    state.recommendProductDetail = payload;
  },
  GET_PRODUCT(state, payload) {
    state.product = payload;
  },
  GET_ALL_PRODUCT(state, payload) {
    state.products = payload;
  },
  GET_PRODUCT_BY_CATEGORY(state, payload) {
    state.products = payload;
  },
  UPDATE_PRODUCT() {},
  GET_RATING(state, payload) {
    state.productRates = payload.rates;
    state.totalRates = payload.total;
  },
  CREATE_RATING() {},
  FILTER_RATE(state, payload) {
    state.filterRate = payload;
  },
  BEST_SELL(state, payload) {
    state.bestSell = payload.map(r => r._id.product[0]);
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}