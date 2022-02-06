import axios from '../plugins/axios';
const state = {
  banners: [],
}

const getters = {

}

const actions = {
  async listBanner({ commit }) {
    try {
      const { data } = await axios.get('/banner');
      commit('LIST_BANNER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const mutations = {
  LIST_BANNER(state, payload) {
    state.banners = payload;
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}