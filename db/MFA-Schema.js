const mongoose = require('./mongoDB-connection');

let multifactorSchema = mongoose.Schema({
        userId: mongoose.Schema.Types.ObjectId,
        secret: String,
})

let MFA = mongoose.model("multifactorauths", multifactorSchema);

module.exports = MFA;
