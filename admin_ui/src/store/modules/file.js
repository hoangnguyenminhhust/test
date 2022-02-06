
import data from '../../constants/menu';
import axios from '../../plugins/axios';
import axiosDefault from 'axios'

const state = {};
const getters = {};

const actions = {
  async uploadFile({ commit }, { file }) {
    try {
      const fileType = file.type.split('/')[1];
      const { data } = await axios.post('/upload', { fileType: fileType });
      await axiosDefault.put(data.url, file, {
        headers: {
          'Content-Type': file.type,
        }
      });
      commit('RETURN_IMAGE_KEY', data.key)
      return Promise.resolve(data.key);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  async uploadFileBase64({ commit }, { dataImage }) {
    try {
      const { data } = await axios.post('/upload/base64', { fileType: 'png' });
      const buff = Buffer.from(dataImage.replace(/^data:image\/\w+;base64,/, ""),'base64');
      await axiosDefault.put(data.url, buff, {
        headers: {
          'Content-Type': 'image/png',
          'Content-Encoding': 'base64',
        }
      });
      commit('RETURN_IMAGE_KEY', data.key)
      return Promise.resolve(data.key);
    } catch (error) {
      return Promise.reject(data);
    }
  },
  async deleteImage({commit}, { key }) {
    try {
      await axios.post('/upload/delete', { key: key });     
      commit('DELETE_IMAGE')
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
const mutations = {
  RETURN_IMAGE_KEY() {},
  DELETE_IMAGE() {},
};

export default {
  state,
  getters,
  actions,
  mutations,
}