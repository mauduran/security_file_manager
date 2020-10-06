const bcrypt = require('bcryptjs');
const db = require('../db/db-connection');
const UserSchema = require('../db/UserSchema');
const LoginSchema = require('../db/LoginSchema');
const MultiFactorSchema = require('../db/MFA-Schema');


const findUser = async (username) => {
    return await User.findOne({ username: username });
}

const handleSignInCredentials = async (username, password) => {
    if ((!username) || !password) {
        return Promise.reject('Missing fields');
    }
    try {
        let user = findUser(username);
        if (!user) {
            return Promise.reject('Wrong credentials');
        }
        const userCredentials = await Login.findOne({ userId: user._id });
        const validCredentials = bcrypt.compareSync(password, userCredentials.hash);

        return (validCredentials) ? Promise.resolve(user) : Promise.reject('Wrong credentials');
    } catch (error) {
        console.log(error);
        return Promise.reject('Unexpected Error');
    }

}


module.exports = {
    findUser,
    handleSignInCredentials
}