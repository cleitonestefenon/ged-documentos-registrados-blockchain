import { api } from '../../../config/axios';
import { KEY_STORAGE } from 'common/localstorage/const';
import { saveAsSessionStorage } from 'common/localstorage';

// Service methods
export const signIn = (email, password, onSuccess, onError) => {
    api.post('auth/authenticate', { email, password })
        .then(resp => {
            saveAsSessionStorage(KEY_STORAGE.TOKEN, resp.data.token)
            saveAsSessionStorage(KEY_STORAGE.EMAIL, resp.data.organization.email)
            saveAsSessionStorage(KEY_STORAGE.NAME, resp.data.organization.name)
            saveAsSessionStorage(KEY_STORAGE.ORGANIZATION_ID, resp.data.organization.id)
            onSuccess(resp)
        })
        .catch(err => {
            onError(err);
        })
};

export const verifyWalletInformation = async (organizationId, onSuccess, onError) => {

    await api.get(`organization/${organizationId}/wallet_information`)
        .then(resp => {
            onSuccess(resp);
        })
        .catch(err => {
            onError(err);
        })
}