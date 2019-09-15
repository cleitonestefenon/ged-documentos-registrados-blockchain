import api from 'config/axios';
import { DOCS_SERVICE } from 'config/secret';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export async function getDocuments() {
    const organization = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

    return await api.post(`${DOCS_SERVICE}/doc/find_transactions`, { organization });
}

export async function findAllOrganizations(offset, limit, onSuccess, onError) {
    const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    api.get(`${DOCS_SERVICE}/organization/${id}/findSharedOrganizations/${offset}/${limit}`)
        .then(resp => {
            const respMapped = resp.data.map(friend => {
                console.log(friend)
                return {
                    publickey: friend.Invited.wallet.publickey,
                    match: friend.match, 
                    ...friend.Invited,
                    wallet: undefined
                }
            })
            console.log(respMapped)
            onSuccess && onSuccess(respMapped)
        })
        .catch(err => {
            onError && onError(err)
        })

}