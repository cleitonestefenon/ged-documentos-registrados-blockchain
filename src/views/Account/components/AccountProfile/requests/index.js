import axios from 'axios';
import api from 'config/axios';
import { DOCS_SERVICE, FILE_SERVICE } from 'config/secret';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const getUserIP = async () => {

    const result = await axios.get('https://api.ipify.org?format=json');

    if (result.status === 200) {
        return result.data.ip;
    }
    return '';
}

export const saveAvatar = async (formData, onSuccess, onError) => {
    const organizationId = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    api.post(`${DOCS_SERVICE}/organization/${organizationId}/update_avatar`, formData, config)
        .then(resp => {
            onSuccess(resp);
        }).catch(err => {
            onError(err);
        });
}

export const getAvatarById = async (id, onSuccess) => {
    api.get(`${FILE_SERVICE}/file/${id}`)
        .then(resp => {
            onSuccess(resp.data.file)
        })
}

export const removeAvatar = async (onSuccess, onError) => {
    const organizationId = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    const avatarId = getFromSessionStorage(KEY_STORAGE.AVATAR_ID);

    api.delete(`${DOCS_SERVICE}/organization/${organizationId}/remove_avatar/${avatarId}`)
        .then(() => {
            onSuccess()
        })
        .catch(err => {
            onError && onError(err)
        })
}