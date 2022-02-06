
import axios from '../../plugins/axios';

const state = {};
const getters = {};

const actions = {
  async getAllEmployee({ commit }, { limit, skip }) {
    try {
      const { data } = await axios.get(`/user?limit=${limit}&skip=${skip}&role=employee`);
      commit('LIST_ALL_EMPLOYEE', data)
    } catch (error) {
      Promise.reject(error);
    }
  },
  async addEmployee({ commit }, addForm) {
    try {
      const { data } = await axios.post('/user', addForm);
      commit('ADD_EMPLOYEE', data)
    } catch (error) {
      Promise.reject(error);
    }
  }
};
const mutations = {
  LIST_ALL_EMPLOYEE () {},
  ADD_EMPLOYEE () {},
};

export default {
  state,
  getters,
  actions,
  mutations,
}