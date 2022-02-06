import firebase from 'firebase/app'
import 'firebase/auth'
import axios from '../../plugins/axios';
import { currentUser, isAuthGuardActive } from '../../constants/config'
import { setCurrentUser, getCurrentUser } from '../../utils'
import { UserRole } from '../../utils/auth.roles';

export default {
  state: {
    currentUser: {},
    token: '',
    loginError: null,
    processing: false,
    forgotMailSuccess: null,
    resetPasswordSuccess: null
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess: state => state.resetPasswordSuccess,
  },
  mutations: {
    SEARCH_USER() {},
    DELETE_USER() {},
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    setUser(state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.forgotMailSuccess = true
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess = true
    },
    clearError(state) {
      state.loginError = null
    },
    LOGIN(state, payload) {
      state.currentUser = payload.user;
      state.token = payload.token;
      localStorage.setItem('app_token', payload.token);
    },
    GET_USER(state, payload) {
      state.currentUser = payload;
    },
    GET_TOKEN(state, payload) {
      state.token = payload;
    },
    SIGN_OUT(state) {
      state.currentUser = {};
      state.token = "";
      localStorage.removeItem('app_token');
    },
    CHANGE_PASSWORD() {},
    FORGOT_PASSWORD() {},
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const { data } = await axios.post('/user/login-admin', { email, password });
        commit('LOGIN', data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkAuth({ commit }) {
      try {
        if (localStorage.getItem('app_token')) {
          commit('GET_TOKEN', localStorage.getItem('app_token'))
          const { data } = await axios.get('/user/getUser');
          commit('GET_USER', data);
        } 
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
        await axios.post('/user/forgot-password-admin', { email: payload.email });
        commit('FORGOT_PASSWORD');
      } catch (error) {
        return Promise.reject(error);
      }
    },
    resetPassword({ commit }, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .confirmPasswordReset(payload.resetPasswordCode, payload.newPassword)
        .then(
          user => {
            commit('clearError')
            commit('setResetPasswordSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },


    signOut({ commit }) {
      commit('SIGN_OUT')
    },
    async getUser({ commit }) {
      try {
        const { data } = await axios.get('/user/getUser');
        commit('GET_USER', data);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteUser({ commit }, { userId }) {
      try {
        await axios.delete(`/user/${userId}`);
        commit('DELETE_USER');
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateUser({ commit }, user ) {
      try {
        const { data } = await axios.put(`user/${user._id}`, user)
        commit('UPDATE_USER', data)
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async searchUser({ commit }, { text, skip, limit }) {
      try {
        const { data } = await axios.get(`user/find-user?text=${text}&skip=${skip}&limit=${limit}`);
        console.log(data);
        commit('SEARCH_USER', data);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
}
