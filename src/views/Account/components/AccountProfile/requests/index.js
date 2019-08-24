import axios from 'axios';

export const getUserIP = async () => {

    const result = await axios.get('https://api.ipify.org?format=json');

    if(result.status == 200) {
        return result.data.ip;
    }
    return '';
}