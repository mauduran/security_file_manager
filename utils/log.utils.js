const LogSchema = require('../db/LogSchema');

const LOG_ACTION_TYPES = {
    REGISTER: 'REGISTER',
    LOGIN: 'LOGIN',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    FILE_UPLOAD: 'FILE_UPLOAD',
    FILE_VERIFICATION: 'FILE_VERIFICATION',
    FILE_DOWNLOAD: 'FILE_DOWNLOAD',
    MULTIFACTOR_UPDATE: 'MULTIFACTOR_UPDATE',
    FILE_ENCRYPTION: 'FILE_ENCRYPTION',
    FILE_DECRYPTION: 'FILE_DECRYPTION',
    PROFILE_CHANGE: 'PROFILE_CHANGE',
    PASSWORD_CHANGE: 'PASSWORD_CHANGE' 
}

const getLogs = async (userId) => {
    try {
        const logs = await LogSchema.find({userId}).sort({date: -1});
        return Promise.resolve(logs);
    } catch (error) {
        Promise.reject(error);
    }
}

const logAction = async (userId, action, session=null, fileName=null) => {
    try {
        let newLog = {
            userId,
            action
        }

        if(fileName) newLog.file = fileName;

        let options = {};

        if(session) options.session = session;

        let logDocument = LogSchema(newLog);
        const createdLog = await logDocument.save({options});
        Promise.resolve(createdLog);
    } catch (error) {
        console.log(error);
        return Promise.reject('Unexpected Error');
    }

}


module.exports = {
    logAction,
    getLogs,
    LOG_ACTION_TYPES
}