const mongoose = require('./mongoDB-connection');

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

})

let User = mongoose.model("users", userSchema);

module.exports = User;