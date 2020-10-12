const express = require('express');
const router = express.Router();
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const sessionUtils = require('../../utils/session.utils');
const logUtils = require('../../utils/log.utils');



router.route('/')
    .get((req, res) => {
        res.json(req.user);
    })

router.route('/update/name')
    .put(async (req, res) => {
        const name = req.body.name;
        if (!name) return res.status(400).json('No name was provided.');

        try {
            await sessionUtils.updateUserName(req.userId, name);
            logUtils.logAction(req.userId, logUtils.LOG_ACTION_TYPES.PROFILE_CHANGE);
            res.json("Name updated");
        } catch (error) {
            res.status(400).json("Something went wrong")
        }
    })

router.route('/update/password')
    .put(async (req, res) => {
        const {currentPassword, newPassword} = req.body;

        if(!currentPassword || !newPassword) return res.status(400).json("Missing fields")

        try {
            await sessionUtils.handleSignInCredentials(req.userId, currentPassword);
            await sessionUtils.updatePassword(req.userId, newPassword);
            await logUtils.logAction(req.userId, logUtils.LOG_ACTION_TYPES.PASSWORD_CHANGE);

            return res.json("Success");
        } catch (error) {
            console.log(error);
            return res.status(400).json('Invalid password');
        }
    })

router.route('/update/multifactor')
    .put(async (req, res)=>{
        
        try {
            var secret = speakeasy.generateSecret({
                name: req.username
            });
            if (!(await sessionUtils.updateMultiFactorSecret(req.userId, secret.ascii))) throw new Error('MFA_Exception');
        
            let qrCode = await qrcode.toDataURL(secret.otpauth_url);

            await logUtils.logAction(req.userId, logUtils.LOG_ACTION_TYPES.MULTIFACTOR_UPDATE);

            res.json({
                message: 'User registered successfully',
                qr: qrCode
            })
        } catch (error) {
            console.log(error);
            res.status(400).json('Unexpected Error');
        }


    });

module.exports = router; 