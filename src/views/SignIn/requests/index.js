import { api } from '../../../config/axios';
import { isAuthenticated } from 'auth';




// Service methods
export const signIn = (email, password, onSuccess) => {

    api.post('auth/authenticate', { email, password })
        .then(resp => {
            sessionStorage.setItem('token', resp);
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