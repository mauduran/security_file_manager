const path = require('path');
const fs = require('fs');
const db = require('../../db/mongodb-connection');
const logUtils = require('../../utils/log.utils');
const signatures = require('../../utils/signature.utils');
const fileUtils = require('../../utils/file.utils');

const downloadFile = async (req, res) => {
    const filename = req.params.filename;
    if (!filename) {
        return res.status(400).json("Missing fields");
    }

    try {
        let file = path.join('.', 'file_uploads', req.username, filename, filename);

        await logUtils.logAction(req.userId, logUtils.LOG_ACTION_TYPES.FILE_DOWNLOAD, null, filename);
        
        if (fs.existsSync(file)) {
            res.download(file);
            return;
        } else {
            res.status(400).json("File does not exist.");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json("There was an error");
    }
};

const getFiles = async (req, res) => {
    try {
        // const fileObjects = fs.readdirSync(path.join('.', 'file_uploads', req.username));
        res.json(req.user.files);
    } catch (error) {
        res.status(400).json("Could not get files");
        return;
    }
}


const uploadFiles = async (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;

    try {
        const session = await db.startSession();
        session.startTransaction();

        const fileName = file.name.replace(/\s/g, "-");
    
        const outputRoute = path.join('.', 'file_uploads', req.username, fileName);
        if (!fs.existsSync(outputRoute)) {
            fs.mkdirSync(outputRoute);
        }

        file.mv(outputRoute + '/' + fileName, async err => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            const signature = signatures.signDocument(outputRoute, fileName);

            await fileUtils.addFileRegister(req.userId, fileName, signature, session)
            await logUtils.logAction(req.userId, logUtils.LOG_ACTION_TYPES.FILE_UPLOAD, session, fileName);

            await session.commitTransaction();
            res.json({ fileName: file.name, filePath: `file_uploads/${fileName}` });
        });
    } catch (error) {
        res.status(400).json("There was an error")
    }
}

module.exports = {
    downloadFile,
    getFiles,
    uploadFiles
}