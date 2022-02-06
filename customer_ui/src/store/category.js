import axios from '../plugins/axios';
const state = {
  categories: [],
}

const getters = {

}

const actions = {
  async getAllCategory({ commit }) {
    try {
      const { data } = await axios.get('/category');
      commit('GET_ALL_CATEGORY', data)
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const mutations = {
  GET_ALL_CATEGORY(state, payload) {
    state.categories = payload
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}