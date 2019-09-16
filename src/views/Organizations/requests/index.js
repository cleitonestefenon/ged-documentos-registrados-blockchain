import api from 'config/axios';
import { DOCS_SERVICE } from 'config/secret';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export async function findAllSharedOrganizations(offset, limit, onSuccess, onError) {
    const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    api.get(`${DOCS_SERVICE}/organization/${id}/findSharedOrganizations/${offset}/${limit}`)
        .then(resp => {
            const respMapped = resp.data.map(friend => {
                return {
                    publickey: friend.Invited.wallet.publickey,
                    match: friend.match,
                    ...friend.Invited,
                    wallet: undefined
                }
            })
            onSuccess && onSuccess(respMapped)
        })
        .catch(err => {
            onError && onError(err)
        })
}


export async function findSharedOrganizationsByName(value, offset, limit, onSuccess, onError) {
    const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    api.get(`${DOCS_SERVICE}/organization/${id}/findSharedOrganizationsByName/${value}/${offset}/${limit}`)
        .then(resp => {
            const respMapped = resp.data.map(friend => {
                return {
                    publickey: friend.Invited.wallet.publickey,
                    match: friend.match, 
                    ...friend.Invited,
                    wallet: undefined
                }
            })
            onSuccess && onSuccess(respMapped)
        })
        .catch(err => {
            onError && onError(err)
        })
}


export async function findSharedOrganizationsByEmail(value, offset, limit, onSuccess, onError) {
    const id = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);
    api.get(`${DOCS_SERVICE}/organization/${id}/findSharedOrganizationsByEmail/${value}/${offset}/${limit}`)
        .then(resp => {
            const respMapped = resp.data.map(friend => {
                return {
                    publickey: friend.Invited.wallet.publickey,
                    match: friend.match, 
                    ...friend.Invited,
                    wallet: undefined
                }
            })
            onSuccess && onSuccess(respMapped)
        })
        .catch(err => {
            onError && onError(err)
        })
}