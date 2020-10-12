const crypto = require('crypto');
const UserSchema = require('../db/UserSchema');

const algorithm = 'aes-256-ctr';

let k = crypto.randomBytes(16);


const genKey = () => {
    let newKey = crypto.randomBytes(16);
    newKey = crypto.createHash('sha256').update(newKey).digest('base64').substr(0, 32);

    return newKey;
}
const encrypt = (buffer, key = k) => {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

    return result;
}

const decrypt = (doc, key = k) => {
    const iv = doc.slice(0, 16);

    const filedoc = doc.slice(16);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    const result = Buffer.concat([decipher.update(filedoc), decipher.final()]);

    return result;
}


const updateEncryptionData = async (userId, file, key, session=null) => {

    try {
        await UserSchema.updateOne({ "_id": userId, "files.filename": file }, {
            $set: {
                "files.$.status": 'encrypted',
                "files.$.encryptionKey": key
            }
        }).session(session);

        return Promise.resolve('OK');

    } catch (error) {
        return Promise.reject(error);
    }
}

const updateDecryptionData = async (userId, file, session=null) => {
    try {
        await UserSchema.updateOne({ "_id": userId, "files.filename": file }, {
            $set: {
                "files.$.status": 'original',
                "files.$.encryptionKey": ""
            }
        }).session(session);

        return Promise.resolve('OK');

    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    encrypt,
    decrypt,
    genKey,
    updateEncryptionData,
    updateDecryptionData
}