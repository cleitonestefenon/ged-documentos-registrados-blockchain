import api from 'config/axios';
import { FILE_SERVICE } from 'config/secret';
import { saveAsSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const loadAvatar = (avatarId, onSuccess) => {
    api.get(`${FILE_SERVICE}/file/${avatarId}`)
        .then(resp => {
            saveAsSessionStorage(KEY_STORAGE.AVATAR, `data:${resp.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data.file.data)))}`)
            onSuccess && onSuccess(`data:${resp.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data.file.data)))}`);
        })
}

export const mountDataImage = async avatarId => {
    const resp = await api.get(`${FILE_SERVICE}/file/${avatarId}`)

    return `data:${resp.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data.file.data)))}`;
}

export const removeElementOfList = (list, simple = true, field, valueOfElement) => {
    return list.filter(element => {
        if (simple) {
            return element !== valueOfElement;
        } else {
            return element[field] !== valueOfElement;
        }
    })
}