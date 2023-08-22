import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {API_URL} from '../../../env.json';

const API = axios.create({
  baseURL: 'https://api.belanja24.com/api/v1',
});

const API2 = axios.create({
  baseURL: 'https://api.belanja24.com',
});

// Tambahkan axios interceptors untuk mengatur Authorization header
API.interceptors.request.use(async config => {
  const auth = await Keychain.getGenericPassword();
  const token = auth.password;
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

API2.interceptors.request.use(async config => {
  const auth = await Keychain.getGenericPassword();
  const token = auth.password;
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export {API, API2};
