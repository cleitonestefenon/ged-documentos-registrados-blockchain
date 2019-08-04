import {api} from '../../../config/axios';

// Service methods
export const signIn = async (email, password) => {
    const organization = await api.post('auth/authenticate', {email, password} );
    console.log(organization);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };