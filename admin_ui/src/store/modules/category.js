
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
  async getAllParentCategory({ commit }) {
    try {
      const { data } = await axios.get('/parentCategory');
      console.log('call')
      commit('RETURN_PARENT_CATEGORY', data);
      Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async editCategory({ commit }, { _id ,name, parent }) {
    try {
      await axios.put(`/category/${_id}`, { name, parent })
      commit('UPDATE_CATEGORY');
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async editParentCategory({ commit }, { _id ,name, level }) {
    try {
      await axios.put(`/parentCategory/${_id}`, { name, level })
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async addCategory({ commit }, { name, parent }) {
    try {
      const { data } = await axios.post('/category', { name, parent });
      commit('ADD_CATEGORY', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async addParentCategory({ commit }, { name, level }) {
    try {
      const { data } = await axios.post('/parentCategory', { name, level });
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
  },
  async deleteParentCategory({ commit }, { _id }) {
    try {
      await axios.delete(`/parentCategory/${_id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
const mutations = {
  RETURN_CATEGORY() {},
  RETURN_PARENT_CATEGORY() {},
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