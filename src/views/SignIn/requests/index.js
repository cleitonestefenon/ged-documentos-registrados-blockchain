import api from 'config/axios';
import { DOCS_SERVICE } from 'config/secret';
import { KEY_STORAGE } from 'common/localstorage/const';
import { saveAsSessionStorage } from 'common/localstorage';
import { loadAvatar } from 'common/functions';

// Service methods
export const signIn = (email, password, onSuccess, onError) => {
    api.post(`${DOCS_SERVICE}/auth/authenticate`, { email, password })
        .then(resp => {
            loadAvatar(resp.data.organization.oidphoto)
            saveAsSessionStorage(KEY_STORAGE.AVATAR_ID, resp.data.organization.oidphoto);
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

    await api.get(`${DOCS_SERVICE}/organization/${organizationId}/wallet_information`)
        .then(resp => {
            onSuccess(resp);
        })
        .catch(err => {
            onError(err);
            console.log(err)
        })
}

