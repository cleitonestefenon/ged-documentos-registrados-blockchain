import api from 'config/axios';
import { DOCS_SERVICE } from 'config/secret';

export async function findAllDocumentsByOrganization(organizationId, offset, limit, onSuccess, onError) {
    api.get(`${DOCS_SERVICE}/doc/find_transactions/${organizationId}/${offset}/${limit}`).then(resp => {
        onSuccess && onSuccess(resp.data)
    }).catch(err => {
        onError && onError(err)
    })
}
