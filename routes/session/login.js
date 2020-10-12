const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');

const sessionUtils = require('../../utils/session.utils');
const logUtils = require('../../utils/log.utils');
const MultiFactorSchema = require('../../db/MFA-Schema');


router.route('/')
    .post(async (req, res) => {
        let { username, password } = req.body;

        username = username.toLowerCase();

        if (!username || !password) {
            res.status(404).json("Missing fields.");
            return;
        }

        try {
            const user = await sessionUtils.findUser(username);

            if (!user) {
                res.status(400).json("Username does not exist");
                return;
            }

            await sessionUtils.handleSignInCredentials(user._id, password);

            res.status(200).json({ username: user.username })
        } catch (error) {
            console.log(error);
            if (error.userId) {
                await logUtils.logAction(error.userId, logUtils.LOG_ACTION_TYPES.LOGIN_FAILURE);
                res.status(400).json(error.message);
                return;
            }
            res.status(400).json(error);
        }
    });

router.route('/verify')
    .post(async (req, res) => {
        let username = req.body.username;

        if (!username) {
            res.status(404).json("Missing fields.");
            return;
        }

        try {
            const user = await sessionUtils.findUser(username);

            if (!user || !req.body.token) {
                res.status(400).json("Missing fields.");
                return;
            }
            const mfaRecord = await MultiFactorSchema.findOne({ userId: user._id });

            const secret = mfaRecord.secret;

            let verified = speakeasy.totp.verify({
                secret: secret,
                encoding: 'ascii',
                token: req.body.token
            })


            if (verified) {
                await logUtils.logAction(user._id, logUtils.LOG_ACTION_TYPES.LOGIN);
                res.status(200).json({ message: 'verified' })
            } else {
                logUtils.logAction(user._id, logUtils.LOG_ACTION_TYPES.LOGIN_FAILURE);
                res.status(400).json("Incorrect code");
            }
        } catch (error) {
            res.status(400).json("Could not login with given code");
        }

    })

module.exports = router; 