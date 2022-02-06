import axios from '../../plugins/axios';

const state = {
  banners: [],
};

const getters = {

}

const actions = {
  async createBanner({ commit }, payload) {
    try {
      const { data } = await axios.post('/banner', payload);
      commit('CREATE_BANNER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateBanner({ commit }, payload) {
    try {
      const { data } = await axios.put(`/banner/${payload._id}`, payload);
      commit('UPDATE_BANNER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async listBanner({ commit }) {
    try {
      const { data } = await axios.get('/banner');
      commit('LIST_BANNER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteBanner({ commit }, payload) {
    try {
      await axios.delete(`/banner/${payload._id}`);
      commit('DELETE_BANNER');
    } catch (error) {
      return Promise.reject(error);
    }
  } 
};

const mutations = {
  CREATE_BANNER() {},
  LIST_BANNER(state, payload) {
    state.banners = payload;
  },
  UPDATE_BANNER() {},
  DELETE_BANNER() {},
}

export default {
  state,
  getters,
  actions,
  mutations
}