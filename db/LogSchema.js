const mongoose = require('./mongoDB-connection');

let logSchema = mongoose.Schema({
        userId: mongoose.Schema.Types.ObjectId,
        action: String,
        file: String,
        date:  {
            type:Date,
            default: Date.now
        }
})

let Log = mongoose.model("logs", logSchema);

module.exports = Log;
