import api from 'config/axios';
import { FILE_SERVICE } from 'config/secret';
import { saveAsSessionStorage } from 'common/localstorage';
import { KEY_STORAGE } from 'common/localstorage/const';

export const loadAvatar = (avatarId, onSuccess) => {
    api.get(`${FILE_SERVICE}/file/${avatarId}`)
        .then(resp => {
            saveAsSessionStorage(KEY_STORAGE.AVATAR, `data:${resp.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data.file.data)))}`)
            onSuccess && onSuccess(`data:${resp.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data.file.data)))}`);
        })
}

export const mountDataImage = async avatarId => {
    const resp = await api.get(`${FILE_SERVICE}/file/${avatarId}`)

    return `data:${resp.mimetype};base64,${btoa(String.fromCharCode(...new Uint8Array(resp.data.file.data)))}`;
}

export const removeElementOfList = (list, simple = true, field, valueOfElement) => {
    return list.filter(element => {
        if (simple) {
            return element !== valueOfElement;
        } else {
            return element[field] !== valueOfElement;
        }
    })
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }

 export function getBytesFromFile(file) {
    var reader = new FileReader();
    let stringBytes = null;

    reader.readAsArrayBuffer(file);

    reader.onload = () => {
        var arrayBuffer = reader.result
        var bytes = new Uint8Array(arrayBuffer);
        
        stringBytes = bytes.toString();
    }
    return stringBytes + "";
 }