import api from 'config/axios';
import { DOCS_SERVICE } from 'config/secret';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const findOrganizationByName = async (value, offset, limit, onSuccess) => {
    const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    const resp = await api.get(`${DOCS_SERVICE}/organization/${id}/findByName/${value || ' '}/${offset}/${limit}`);

    onSuccess && onSuccess(resp);
}

export const findOrganizationByAddress = async (value, offset, limit, onSuccess) => {
    const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    const resp = await api.get(`${DOCS_SERVICE}/organization/${id}/findOrganizationByAddress/${value || 'a'}/${offset}/${limit}`);

    onSuccess && onSuccess(resp);
}

export const findOrganizationByPublicKey = async (value, offset, limit, onSuccess) => {
    const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    const resp = await api.get(`${DOCS_SERVICE}/organization/${id}/findOrganizationByPublicKey/${value || 'a'}/${offset}/${limit}`);

    onSuccess && onSuccess(resp);
}

export const sendInvite = async (invitedid, onSuccess) => {
    const resp = await api.post(`${DOCS_SERVICE}/organization/send_invite`, {
        interestedid: getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID),
        invitedid
    });

    onSuccess && onSuccess(resp);
}