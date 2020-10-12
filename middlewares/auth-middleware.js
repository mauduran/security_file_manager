
const sessionUtils = require('../utils/session.utils');

const authMiddleware = async (req, res, next) =>{
    let username = (req.query.username)? req.query.username: req.headers.authorization;
 
    if (!username) {
        return res.status(401).json({ msg: 'Username needed' });
    }

    try {
        const user = await sessionUtils.findUser(username);
        
        if (!user) {
            res.status(404).json("Username does not exist");
            return;
        }

        req.userId = user._id;
        req.username = username;
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json("Unexpected error");
    }
}

module.exports = authMiddleware;