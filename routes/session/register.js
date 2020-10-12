const express = require('express');
const speakeasy = require('speakeasy')
const qrcode = require('qrcode');
const router = express.Router();
const argon2 = require('argon2');
const fs = require('fs');
const path = require('path');

const db = require('../../db/mongodb-connection');
const sessionUtils = require('../../utils/session.utils');
const logUtils = require('../../utils/log.utils');

router.route('/')
    .post(async (req, res) => {
        let { name, username, password } = req.body;
        username = username.toLowerCase();
        const session = await db.startSession();
        session.startTransaction();
        try {
            if (await sessionUtils.findUser(username)) {
                res.status(409).json('Username already exists');
                return;
            }

            const userId = await sessionUtils.insertUser(name, username, session);
            const hash = await argon2.hash(password);
            await sessionUtils.insertUserLogin(userId, hash, session);
            var secret = speakeasy.generateSecret({
                name: username
            });

            await logUtils.logAction(userId, logUtils.LOG_ACTION_TYPES.REGISTER);

            if (!(await sessionUtils.insertMultiFactorSecret(userId, secret.ascii, session))) throw new Error('MFA_Exception');

            let qrCode = await qrcode.toDataURL(secret.otpauth_url);

            const outputRoute = path.join('.', 'file_uploads', username);
            if (!fs.existsSync(outputRoute)) {
                fs.mkdirSync(outputRoute);
            }

            await session.commitTransaction();
            res.json({
                message: 'User registered successfully',
                qr: qrCode
            })
        } catch (error) {
            await session.abortTransaction();
            res.status(400).json('Unexpected Error');
        }
    })


module.exports = router; 