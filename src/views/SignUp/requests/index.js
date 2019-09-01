import api from 'config/axios';
import { DOCS_SERVICE } from 'config/secret';

// Service methods
export const signUp = (name, email, password, onSuccess, onError) => {
   api.post(`${DOCS_SERVICE}/auth/register`, { name, email, password })
      .then(resp => {
         onSuccess(resp);
      }).catch(err => {
         onError(err)
      })
};