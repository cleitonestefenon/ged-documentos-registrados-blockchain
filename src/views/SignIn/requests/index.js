import { api } from '../../../config/axios';
import { KEY_STORAGE } from 'common/localstorage/const';

// Service methods
export const signIn = (email, password, onSuccess, onError) => {
    api.post('auth/authenticate', { email, password })
        .then(resp => {
            sessionStorage.setItem(KEY_STORAGE.TOKEN, resp);
            onSuccess(resp);
        }).catch(err => {
            onError(err);
        })
};

export const getWalletInformation = () => {

}