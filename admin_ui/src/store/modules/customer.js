
import axios from '../../plugins/axios';

const state = {};
const getters = {};

const actions = {
  async getAllCustomer({ commit }, { limit, skip }) {
    try {
      const { data } = await axios.get(`/user/?limit=${limit}&skip=${skip}&role=customer`);
      commit('LIST_ALL_CUSTOMER', data)
    } catch (error) {
      Promise.reject(error);
    }
  },
};
const mutations = {
  LIST_ALL_CUSTOMER () {},
};

export default {
  state,
  getters,
  actions,
  mutations,
}