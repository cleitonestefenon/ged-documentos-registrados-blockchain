import api from 'config/axios';
import { DOCS_SERVICE } from 'config/secret';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export async function getDocuments() {
    const organization = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

    return await api.post(`${DOCS_SERVICE}/doc/find_transactions`, { organization });
}