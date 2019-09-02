import api from 'config/axios';
import { DOCS_SERVICE } from 'config/secret';

export const findOrganizationByName = async (value, offset, limit, onSuccess) => {
    const resp = await api.get(`${DOCS_SERVICE}/organization/findByName/${value || 'a'}/${offset}/${limit}`);

    onSuccess && onSuccess(resp);
}

export const findOrganizationByAddress = (value, onSuccess) => {
    api.get(`${DOCS_SERVICE}/organization/findByName/${value}`)
        .then(resp => {
            onSuccess(resp)
        })
        .catch(err => {
            console.error(err)
        })
}

export const findOrganizationByPublicKey = (value, onSuccess) => {
    api.get(`${DOCS_SERVICE}/organization/findByName/${value}`)
        .then(resp => {
            onSuccess(resp)
        })
        .catch(err => {
            console.error(err)
        })
}