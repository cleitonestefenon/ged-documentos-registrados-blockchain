import axios from 'config/axios'
import { DOCS_SERVICE } from 'config/secret';
import { getFromSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const countNumberOfFriends = (onSuccess, onError, onFinnaly) => {
    const organization = getFromSessionStorage(KEY_STORAGE.ORGANIZATION_ID);

    axios.get(`${DOCS_SERVICE}/dashboard/count_number_of_friends/${organization}`)
    .then(resp => {
        onSuccess && onSuccess(resp)
    }).catch(err => {
        onError && onError(err)
    }).finally(() => {
        onFinnaly && onFinnaly()
    })
}
