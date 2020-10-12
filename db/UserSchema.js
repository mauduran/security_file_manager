const mongoose = require('./mongoDB-connection');

const FileSchema = require('./FileSchema');

let userSchema = mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    joined: {
        type:Date,
        default: Date.now
    },
    files: [FileSchema]

})

let User = mongoose.model("user", userSchema);

module.exports = User;