import api from "config/axios";
import { DOCS_SERVICE } from "config/secret";

export const getWalletInformation = async (organizationId, onSuccess, onError) => {
    await api.get(`${DOCS_SERVICE}/organization/${organizationId}/wallet_information`)
        .then(resp => {
            onSuccess(resp);
        })
        .catch(err => {
            onError(err);
        })
}

export const save = async (organizationId, data, onSuccess, onError) => {
    await api.post(`${DOCS_SERVICE}/organization/${organizationId}/create_wallet`, data)
        .then(resp => {
            onSuccess(resp)
        })
        .catch(err => {
            onError(err);
        })
}

export const update = async (organizationId, data, onSuccess, onError) => {
    await api.put(`${DOCS_SERVICE}/organization/${organizationId}/update_wallet`, data)
        .then(resp => {
            onSuccess(resp)
        })
        .catch(err => {
            onError(err);
        })
}