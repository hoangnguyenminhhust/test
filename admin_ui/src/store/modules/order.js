
import axios from '../../plugins/axios';

const state = {
  orders: [],
  total: 0,
  order: {},
  orderDetail: [],
  pendingOrders: 0,
  finishOrders: 0
};
const getters = {};

const actions = {
  async getAllOrder({ commit }, { limit, skip }) {
    try {
      const { data } = await axios.post(`/order/list-order-by-condition?limit=${limit || ''}&skip=${skip || ''}`);
      commit('LIST_ALL_ORDER', data)
    } catch (error) {
      Promise.reject(error);
    }
  },
  // async addEmployee({ commit }, addForm) {
  //   try {
  //     const { data } = await axios.post('/user', addForm);
  //     commit('ADD_EMPLOYEE', data)
  //   } catch (error) {
  //     Promise.reject(error);
  //   }
  // },
  async getOrder({ commit }, { orderId }) {
    try {
      const { data } = await axios.get(`/order/${orderId}`);
      commit('GET_ORDER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getOrderDetail({ commit }, { orderId }) {
    try {
      const { data } = await axios.post('/order/get-order-detail', { orderId: orderId });
      commit('GET_ORDER_DETAIL', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateOrder({ commit }, order) {
    try {
      const { data } = await axios.put(`/order/${order._id}`, order);
      commit('UPDATE_ORDER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteOrder({ commit }, { orderId }) {
    try {
      await axios.delete(`/order/${orderId}`);
      commit('DELETE_ORDER');
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getFeeShip({ commit }, { districtId, wardId }) {
    try {
      const { data } = await axios.post('/order/get-fee-ship', {
        to_district_id: districtId,
        to_ward_code: wardId,
      })
      commit('GET_FEE_SHIP', data.data.service_fee)
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async findOrder({ commit }, { startDate, endDate, limit, skip, name }) {
    try {
      const { data } = await axios.post(`/order/find-order?limit=${limit}&skip=${skip}`, { startDate, endDate, name });
      commit('FIND_ORDER', data)
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async createOrderShip({ commit }, payload) {
    try {
      const { data } = await axios.post('/order/create-order-ship', payload);
      commit('CREATE_ORDER_SHIP', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async listPendingOrder({ commit }) {
    try {
      const { data } = await axios.post('/order/list-order-by-status', { status: 'pending' });
      commit('LIST_PENDING_ORDER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async listFinishOrder({ commit }) {
    try {
      const { data } = await axios.post('/order/list-order-by-status', { status: 'finish' });
      commit('LIST_FINISH_ORDER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
const mutations = {
  LIST_ALL_ORDER (state, payload) {
    state.orders = payload.orders;
    state.total = payload.totalOrders;
  },
  ADD_EMPLOYEE () {},
  UPDATE_ORDER () {

  },
  DELETE_ORDER () {},
  GET_ORDER(state, payload) {
    state.order = payload;
  },
  GET_ORDER_DETAIL(state, payload) {
    state.orderDetail = payload;
  },
  GET_FEE_SHIP() {},
  FIND_ORDER(state, payload) {
    state.orders = payload.orders;
    state.total = payload.totalOrders;
  },
  CREATE_ORDER_SHIP() {},
  LIST_PENDING_ORDER(state, payload) {
    state.pendingOrders = payload;
  },
  LIST_FINISH_ORDER(state, payload) {
    state.finishOrders = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
}