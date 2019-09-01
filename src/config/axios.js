import axios from 'axios'

import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

const api = axios.create({
  baseURL: ""
});

api.interceptors.request.use(async config => {

    const token = getFromSessionStorage(KEY_STORAGE.TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
  
export default api;
  