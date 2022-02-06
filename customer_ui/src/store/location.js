import axios from '../plugins/axios';
const state = {
  locations: [],
  provinces: [],
  districts: [],
  wards: [],
}

const getters = {

}

const actions = {
  async getLocation({ commit }) {
    try {
      const { data } = await axios.get('/location');
      commit('GET_LOCATION', data)
    } catch (error) {
      return Promise.reject(error)
    }
  }, 
  async getProvince({ commit }) {
    try {
      const { data } = await axios.get('/location/province');
      commit('GET_PROVINCE', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getDistrict({ commit }, { provinceId }) {
    try {
      const { data } = await axios.get(`/location/district?provinceId=${provinceId}`);
      commit('GET_DISTRICT', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getWard({ commit }, { districtId }) {
    try {
      const { data } = await axios.get(`/location/ward?districtId=${districtId}`);
      commit('GET_WARD', data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const mutations = {
  GET_LOCATION(state, payload) {
    state.locations = payload;
  },
  GET_PROVINCE(state, payload) {
    state.provinces = payload.data;
  },
  GET_DISTRICT(state, payload) {
    state.districts = payload.data;
  },
  GET_WARD(state, payload) {
    state.wards = payload.data;
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}