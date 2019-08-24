import { api } from "config/axios";

export const getWalletInformation = async (organizationId, onSuccess, onError) => {
    await api.get(`organization/${organizationId}/wallet_information`)
        .then(resp => {
            onSuccess(resp);
        })
        .catch(err => {
            onError(err);
        })
}

export const save = async (organizationId, data, onSuccess, onError) => {
    await api.post(`organization/${organizationId}/create_wallet`, data)
        .then(resp => {
            onSuccess(resp)
        })
        .catch(err => {
            onError(err);
        })
}

export const update = async (organizationId, data, onSuccess, onError) => {
    await api.post(`organization/${organizationId}/create_wallet`, data)
        .then(resp => {
            onSuccess(resp)
        })
        .catch(err => {
            onError(err);
        })
}