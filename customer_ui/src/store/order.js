import axios from '../plugins/axios';
const state = {
  order: {},
  feeShip: 0,
  orders: [],
  orderDetail: [],
}

const getters = {

}

const actions = {
  async createOrder({ commit }, order) {
    try {
      const { data } = await axios.post('/order', order);
      commit('CREATE_ORDER', data)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async createPaymentUrl({ commit }, { orderId, total }) {
    try {
      const data = await axios.post('/payment/create-payment-url', {
        orderId: orderId,
        total: total,
      })
      return Promise.resolve(data.data);
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async deleteOrder({ commit }, { orderId }) {
    try {
      await axios.delete(`/order/${orderId}`)
    } catch (error) {
      Promise.reject(error);
    }
  },
  async cancelOrder({ commit }, { orderId }) {
    try {
      await axios.post(`/order/return-product`, { orderId: orderId });
      commit('RETURN_PRODUCT')
    } catch (error) {
      Promise.reject(error);
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
  async updateOrder({ commit }, { orderId, payment }) {
    try {
      const { data } = await axios.put(`/order/${orderId}`, { payment: payment });
      commit('UPDATE_ORDER', data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getOrderUser({ commit }, payload) {
    try {
      if (payload.userId) {
        const { data } = await axios.post('/order/list-order-by-user', {
          customerId: payload.userId
        })
        commit('GET_ORDER_USER', data);
      } else {
        const { data } = await axios.post('/order/list-order-by-device', {
          deviceId: payload.deviceId
        });
        commit('GET_ORDER_USER', data);
      }
    } catch (error) {
        return Promise.reject(error);
    }
  },
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
}

const mutations = {
  CREATE_ORDER(state, payload) {
    state.order = payload;
  },
  GET_FEE_SHIP(state, payload) {
    state.feeShip = payload;
  },
  UPDATE_ORDER() {},
  RETURN_PRODUCT() {},
  GET_ORDER_USER(state, payload) {
    state.orders = payload;

  },
  GET_ORDER_DETAIL(state, payload) {
    state.orderDetail = payload;
  },
  GET_ORDER(state, payload) {
    state.order = payload;
  }
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
}