const mongoose = require('./mongoDB-connection');

const FILE_STATUS = ["encrypted", "original"]

let fileSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    signature: {
       type:String,
        default: ""
    },
    status: {
        type: String,
        enum: FILE_STATUS
    },
    encryptionKey: {
        type: String,
        default: ''
    }
})

module.exports = fileSchema