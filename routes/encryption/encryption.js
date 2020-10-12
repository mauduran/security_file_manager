const path = require('path');
const fs = require('fs');
const encryptionUtils = require('../../utils/encryption.utils');
const db = require('../../db/mongodb-connection');
const logUtils = require('../../utils/log.utils');



const encryptFile = async (req, res)=>{
    const file = req.params.file;
 
    if(!file){
        return res.status(400).json('File needs to be specified');
    }
    let userFile = req.user.files.find(el=>el.filename===file);

    if(!userFile){
        return res.status(400).json('No file exists with that name');
    }

    if(userFile.status == 'encrypted'){
        return res.status(400).json('File is already encrypted');
    }
    
    const session = await db.startSession();
    session.startTransaction();
    try {
        const filepath = path.join('.', 'file_uploads', req.username, file, file);
        const doc = fs.readFileSync(filepath);
        const key = encryptionUtils.genKey();
        
        const encryptedBuffer = encryptionUtils.encrypt(doc, key);

        fs.writeFileSync(filepath, encryptedBuffer);

        await logUtils.logAction(req.userId, logUtils.LOG_ACTION_TYPES.FILE_ENCRYPTION, session, file);
        await encryptionUtils.updateEncryptionData(req.userId, file, key, session);
        await session.commitTransaction();
        res.json("File encryption success.")
    } catch(err) {
        console.log(err);
        session.abortTransaction();
        res.status(400).json("Unable to process request");
    }
}

const decryptFile =  async (req, res)=>{
    const file = req.params.file;
 
    if(!file){
        return res.status(400).json('File needs to be specified');
    }
    let userFile = req.user.files.find(el=>el.filename===file);

    if(!userFile){
        return res.status(400).json('No file exists with that name');
    }

    if(userFile.status == 'original'){
        return res.status(400).json('File is not encrypted');
    }

    const session = await db.startSession();
    session.startTransaction();
    try {
        const filepath = path.join('.', 'file_uploads', req.username, file, file);

        const doc = fs.readFileSync(filepath);
        const key = userFile.encryptionKey;

        const decryptedBuffer = encryptionUtils.decrypt(doc, key);

        fs.writeFileSync(filepath, decryptedBuffer);

        await logUtils.logAction(req.userId, logUtils.LOG_ACTION_TYPES.FILE_DECRYPTION, session, file);
        await encryptionUtils.updateDecryptionData(req.userId, file, session);
        await session.commitTransaction();
        res.json("File decryption success.")
    } catch(err) {
        console.log(err);
        session.abortTransaction();
        res.status(400).json("Unable to process request");
    }
}

module.exports = {
    encryptFile,
    decryptFile
}