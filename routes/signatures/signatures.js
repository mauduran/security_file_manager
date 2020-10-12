const path = require('path');
const fs = require('fs');
const signatureUtils = require('../../utils/signature.utils');

const getSignature = async (req, res)=>{
    const file = req.params.file;
 
    try {
        const doc = fs.readFileSync(path.join('.', 'file_uploads', req.username, file, 'qr.png'));
    
        res.set({'Content-Type': 'image/png'}).send(doc);
    } catch(err) {
        console.log(err)
        res.status(400).json("Unable to process request");
    }
}

const verifySignature =  async (req, res)=>{
    try{
        let filename = req.params.file.replace(/\s/g,"-");
        res.json(signatureUtils.verifyDocument(path.join('.', 'file_uploads', req.username, filename), filename));
    } catch(err) {
        res.status(400).json("Unable to process request");
    }
}

module.exports = {
    getSignature,
    verifySignature
}