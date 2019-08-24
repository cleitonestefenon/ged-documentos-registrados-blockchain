export const getWalletInformation = async (organizationId, onSuccess, onError) => {

    await api.get(`organization/${organizationId}/wallet_information`)
        .then(resp => {
            onSuccess(resp);
        })
        .catch(err => {
            onError(err);
        })
}