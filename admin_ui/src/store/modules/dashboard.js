
import axios from '../../plugins/axios';

const state = {
  topSellProducts: [],
  capital: 0,
  revenue: 0,
  chartLabel: [],
  chartData: [],
};
const getters = {};

const actions = {
  async getTopSellProduct({ commit }) {
    try {
      const { data } = await axios.get('/dashboard/list-top-sell');
      commit('LIST_TOP_SELL', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getCapital({ commit }) {
    try {
      const { data } = await axios.get('/dashboard/capital');
      commit('GET_CAPITAL', data.capital);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getRevenue({ commit }) {
    try {
      const { data } = await axios.get('/dashboard/revenue');
      commit('GET_REVENUE', data.revenue);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  async getChartData({ commit }) {
    try {
      const { data } = await axios.get('/dashboard/get-chart-data');
      commit('GET_CHART_DATA', data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
const mutations = {
  LIST_TOP_SELL (state, payload) {
    state.topSellProducts = payload;
  },
  GET_CAPITAL (state, payload) {
    state.capital = payload;
  },
  GET_REVENUE (state, payload) {
    state.revenue = payload;
  },
  GET_CHART_DATA (state, payload) {
    state.chartLabel = payload.chartLabel;
    state.chartData = payload.chartData;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}