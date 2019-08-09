import crypto from 'crypto-js'

const KEYSIZE = 128/32;
const ITERATIONCOUNT = 1000;
const CHAVEPADRAO = '1t713d3844595f233c293f7f65'

export function criptografarTransferencia(texto, chave = CHAVEPADRAO) {
    var iv = crypto.lib.WordArray.random(128/8).toString(crypto.enc.Hex);
    var salt = crypto.lib.WordArray.random(128/8).toString(crypto.enc.Hex);

    var key = generateKey(salt, chave);
    var encrypted = crypto.AES.encrypt(
            texto,
            key,
            { iv: crypto.enc.Hex.parse(iv) }
        );    

    return  iv + "::" + salt + "::" + encrypted.ciphertext.toString(crypto.enc.Base64);
}

export function descriptografarTransferencia(textoBruto, chave = CHAVEPADRAO) {

    if(textoBruto.split("::").length === 3){
        var iv = textoBruto.split("::")[0];
        var salt = textoBruto.split("::")[1];
        var texto = textoBruto.split("::")[2];

        var key = generateKey(salt, chave);
        var cipherParams = crypto.lib.CipherParams.create({
            ciphertext: crypto.enc.Base64.parse(texto)
        });
        var decrypted = crypto.AES.decrypt(
            cipherParams,
            key,
            { iv: crypto.enc.Hex.parse(iv) });
        return decrypted.toString(crypto.enc.Utf8);

    }
}


function generateKey (salt, passPhrase) {
    var key = crypto.PBKDF2(
        passPhrase, 
        crypto.enc.Hex.parse(salt),
        { KEYSIZE: KEYSIZE, iterations: ITERATIONCOUNT });
    return key;
}
