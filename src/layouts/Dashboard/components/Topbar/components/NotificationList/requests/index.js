import api from 'config/axios'
import { DOCS_SERVICE } from 'config/secret';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export async function searchNotifications() {
    const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

    return await api.get(`${DOCS_SERVICE}/organization/${id}/findAllNotifications`);
}

export async function acceptInvite(interestedid) {
    const invitedid = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

    return await api.post(`${DOCS_SERVICE}/organization/accept_invite`, { interestedid, invitedid });
}

export async function rejectInvitation(interestedid) {
    const invitedid = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

    return await api.post(`${DOCS_SERVICE}/organization/reject_invitation`, { interestedid, invitedid });
}
