import axios from 'axios';
import store from '../store/index';

const $axios = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

$axios.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers = { Authorization: `Bearer ${store.state.user.token}` }
  }
  return config
})

export default $axios;