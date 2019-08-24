import { api } from '../../../config/axios';

// Service methods
export const signUp = (name, email, password, onSuccess, onError) => {
   api.post('auth/register', { name, email, password })
      .then(resp => {
         onSuccess(resp);
      }).catch(err => {
         onError(err)
      })
};