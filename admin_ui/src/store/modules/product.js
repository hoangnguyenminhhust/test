
import axios from '../../plugins/axios';

const state = {};
const getters = {};

const actions = {
  async createProduct({ commit }, product) {
    try {
      await axios.post('/product', product);
      commit('CREATE_PRODUCT');
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getAllProduct({ commit }, { limit, skip, name}) {
    try {
      const { data } = await axios.post(`/product/list-product-by-condition?limit=${limit}&skip=${skip}`, {
        name
      });
      commit('GET_ALL_PRODUCT', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteProduct({ commit }, { productId }) {
    try {
      await axios.delete(`/product/${productId}`);
      commit('DELETE_PRODUCT')
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getProduct({ commit }, { productId }) {
    try {
      const { data } = await axios.get(`/product/${productId}`);
      commit('GET_PRODUCT', data);
    } catch (error) {
      
    }
  },
  async updateProduct({ commit }, { _id , name, category_id, cost_price, price, unit, images, properties, description, amount }) {
    try {
      await axios.put(`/product/${_id}`, {
        name,
        category_id,
        cost_price,
        price,
        unit,
        images,
        properties,
        description,
        amount
      });
      commit('UPDATE_PRODUCT');
    } catch (error) {
      Promise.reject(error);
    }
  }
};
const mutations = {
  CREATE_PRODUCT () {},
  GET_ALL_PRODUCT () {},
  DELETE_PRODUCT () {},
  GET_PRODUCT () {},
  UPDATE_PRODUCT () {},
};

export default {
  state,
  getters,
  actions,
  mutations,
}