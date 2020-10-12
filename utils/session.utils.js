const argon2 = require('argon2');
const UserSchema = require('../db/UserSchema');
const LoginSchema = require('../db/LoginSchema');
const MultiFactorSchema = require('../db/MFA-Schema');


const findUser = async (username) => {
    return await UserSchema.findOne({ username: username });
}

const updatePassword = async (userId, password) => {
    try {
        const hash = argon2.hash(password);

        await LoginSchema.updateOne({ userId }, { hash });
        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(false);
    }
}

const updateUserName = async (userId, name) => {
    try {
        await UserSchema.updateOne({ _id: userId }, { name: name });
        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(false);
    }
}

const insertUser = async (name, username, session = null) => {
    let newUser = {
        name,
        username
    };

    try {
        let userDocument = UserSchema(newUser);
        const createdUser = await userDocument.save({ session });

        return Promise.resolve(createdUser._id);
    } catch (error) {
        return Promise.reject(null);
    }
}

const insertUserLogin = async (userId, hash, session = null) => {
    let newLogin = {
        userId,
        hash
    }

    try {
        let loginDocument = LoginSchema(newLogin);
        await loginDocument.save({ session });
        return Promise.resolve(true);
    } catch (error) {
        return Promise.reject(false);
    }

}

const handleSignInCredentials = async (userId, password) => {
    try {
        const userCredentials = await LoginSchema.findOne({ userId: userId });
        const validCredentials = await argon2.verify(userCredentials.hash, password);

        return (validCredentials) ? Promise.resolve(true) : Promise.reject({ userId: userId, message: 'Wrong credentials' });
    } catch (error) {
        console.log(error);
        return Promise.reject({ userId: userId, message: 'Unexpected Error' });
    }
}

const insertMultiFactorSecret = (userId, secret, session = null) => {
    return new Promise(async (resolve, reject) => {
        let newMFArecord = {
            userId,
            secret
        }
        try {
            let multifactorDoc = MultiFactorSchema(newMFArecord);
            await multifactorDoc.save({ session });
            resolve(true);
        } catch (error) {
            reject(false);
        }
    })
}

const updateMultiFactorSecret = (userId, secret, session = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            await MultiFactorSchema.updateOne({ userId }, { secret });
            resolve(true);
        } catch (error) {
            reject(false);
        }
    })
}

module.exports = {
    findUser,
    insertUser,
    insertUserLogin,
    insertMultiFactorSecret,
    handleSignInCredentials,
    updateMultiFactorSecret,
    updateUserName,
    updatePassword
}