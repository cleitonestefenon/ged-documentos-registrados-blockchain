import {api} from '../../../config/axios';




// Service methods
export const signIn = (email, password, onSuccess) => {

    api.post('auth/authenticate', {email, password} )

    .then(resp => {

      onSuccess(resp.data.token);

    }).catch(err => {

      //console.log(err.response.data.error);

    })

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };