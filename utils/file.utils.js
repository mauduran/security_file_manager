const UserSchema = require('../db/UserSchema');

const addFileRegister = async (userId, filename, signature, session=null) => {
    try {
        let newFile = {
            filename,
            signature,
            status: 'original',
        }

        let options = {};

        if(session) options.session = session;

        const user = await UserSchema.findById(userId);
        if(!user){
            Promise.reject('User does not exist');
        }
        
        user.files.push(newFile);

        user.save({options});
        Promise.resolve(user);
    } catch (error) {
        console.log(error);
        return Promise.reject('Unexpected Error');
    }

}

module.exports = {
    addFileRegister
}