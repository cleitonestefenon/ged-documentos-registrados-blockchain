import { criptografar, descriptografar } from 'common/cryptography';

export const saveAsSessionStorage = (key, value) => {
    const cryptoKey = criptografar(key);
    const cryptoValue = criptografar(value);

    sessionStorage.setItem(cryptoKey, cryptoValue);
}

export const getFromSessionStorage = (key) => {
    return descriptografar(sessionStorage.getItem(key));
}

