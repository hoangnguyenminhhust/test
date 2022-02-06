
import axios from '../../plugins/axios';

const state = {};
const getters = {};

const actions = {
  async getAllCategory({ commit }) {
    try {
      const { data } = await axios.get('/category');
      commit('RETURN_CATEGORY', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async editCategory({ commit }, { _id ,name, level }) {
    try {
      await axios.put(`/category/${_id}`, { name, level })
      commit('UPDATE_CATEGORY');
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async addCategory({ commit }, { name, level }) {
    try {
      const { data } = await axios.post('/category', { name, level });
      commit('ADD_CATEGORY', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteCategory({ commit }, { _id }) {
    try {
      await axios.delete(`/category/${_id}`);
      commit('DELETE_CATEGORY');
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
const mutations = {
  RETURN_CATEGORY() {},
  UPDATE_CATEGORY() {},
  ADD_CATEGORY() {},
  DELETE_CATEGORY() {},
};

export default {
  state,
  getters,
  actions,
  mutations,
}