import { api } from '../../../config/axios';

// Service methods
export const signUp = (name, email, password, onSuccess) => {
   api.post('auth/register', { name, email, password })
      .then(resp => {
         console.log(resp);
         onSuccess();
      }).catch(err => {
         console.error(err.response.data.error);
         //mostra error na tela...
      })

   return new Promise(resolve => {
      setTimeout(() => {
         resolve(true);
      }, 1500);
   });
};