import api from 'config/axios';
import { DOCS_SERVICE } from 'config/secret';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export async function getNumberOfNotifications() {
    const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    const { data } = await api.get(`${DOCS_SERVICE}/organization/${id}/countNumberOfNotifications`);

    return data.count;
}