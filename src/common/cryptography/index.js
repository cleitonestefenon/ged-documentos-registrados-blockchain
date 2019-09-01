const crypto = require('crypto');

const ENCRYPTION_KEY = '$1LWXU0/Q1$IvAyMkyR1sN2312ZW.mAW';
const IV_LENGTH = 16;

function criptografar(text) {
    if(text) {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
    
        encrypted = Buffer.concat([encrypted, cipher.final()]);
    
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    return '';
}

function descriptografar(text) {
    if(text) {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
    
        decrypted = Buffer.concat([decrypted, decipher.final()]);
    
        return decrypted.toString();
    }
    return '';
}

module.exports = { descriptografar, criptografar };