import axios from '../plugins/axios';
import mongooose from 'mongoose';
const state = {
  user: null,
  token: null,
  deviceId: null,
}

const getters = {

}

const actions = {
  async createUser({ commit }, user) {
    try {
      const { data } = await axios.post('/user', user);
      commit('CREATE_USER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async login({ commit }, user) {
    try {
      const { data } = await axios.post('/user/login', user);
      commit('LOGIN', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async checkAuth({ commit }) {
    try {
      if (localStorage.getItem('token')) {
        commit('GET_TOKEN', localStorage.getItem('token'));
        const { data } = await axios.get('/user/getUser');
        commit('GET_USER', data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async logout({ commit }) {
    commit('LOG_OUT');
  },
  async getUser({ commit }) {
    try {
      const { data } = await axios.get('/user/getUser');
      commit('GET_USER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateUser({ commit }, user) {
    try {
      await axios.put(`/user/${user._id}`, user);
      commit('UPDATE_USER');
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async changePassword({ commit }, { oldPass, newPass }) {
    try {
      await axios.post('/user/change-pass', {
        oldPass,
        newPass
      });
      commit('CHANGE_PASSWORD')
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async forgotPassword({ commit }, payload) {
    try {
      await axios.post('/user/forgot-password', { email: payload.email });
      commit('FORGOT_PASSWORD');
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getDeviceId({ commit }) {
    try {
      if (!localStorage.getItem('deviceId')) {
        const deviceId = new mongooose.Types.ObjectId();
        commit('DEVICE_ID', deviceId);
      } else {
        commit('DEVICE_ID', localStorage.getItem('deviceId'));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

}

const mutations = {
  CREATE_USER() {
    
  },
  LOGIN (state, payload) {
    state.user = payload.user;
    state.token = payload.token;
    localStorage.setItem('token', payload.token)
  },
  GET_TOKEN(state, payload) {
    state.token = payload;
  },
  GET_USER(state, payload) {
    state.user = payload;
  },
  UPDATE_USER() {},
  LOG_OUT (state) {
    state.user = null;
    state.token = null;
    localStorage.removeItem('token');
  },
  CHANGE_PASSWORD() {},
  FORGOT_PASSWORD() {},
  DEVICE_ID(state, payload) {
    state.deviceId = payload.toString();
    localStorage.setItem('deviceId', payload);
  },
  // GET_DEVICE_ID () {
  //   state.deviceId = localStorage.getItem('deviceId');
  // },
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}