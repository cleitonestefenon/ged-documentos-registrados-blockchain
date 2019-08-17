import { api } from '../../../config/axios';

// Service methods
export const signIn = (email, password, onSuccess, onError) => {
    api.post('auth/authenticate', { email, password })
        .then(resp => {
            sessionStorage.setItem('token', resp);
            onSuccess(resp);
        }).catch(err => {
            onError(err);
        })

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 1500);
    });
};