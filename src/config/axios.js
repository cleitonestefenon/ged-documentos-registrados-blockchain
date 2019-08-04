import axios from 'axios'

import {BASE_URL} from  './secret';

export const api = axios.create({
    headers: { Authorization: '' },
    baseURL: BASE_URL
});