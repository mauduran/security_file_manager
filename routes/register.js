const express = require('express');
const speakeasy = require('speakeasy')
const qrcode = require('qrcode');
const router = express.Router();
const connection = require('../db/db-connection');
const bcrypt = require('bcrypt');

function existsUser(username) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM login WHERE username=?', [username], (error, results) => {
            if (error) {
                reject(false);
                return;
            }
            if (results.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

function insertMultiFactorSecret(userId, secret) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO multifactor(userId, secret) VALUES(?, ?)',
            [userId, secret], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(true);
            })
    })
}


router.route('/')
    .post(async (req, res) => {
        let { username, password } = req.body;
        username = username.toLowerCase();
        try {
            const existsUsr = await existsUser(username);
            if (existsUsr) {
                res.status(409).json('Username already exists');
                return;
            } else {
                bcrypt.hash(password, 10).then(hash => {
                    connection.query('INSERT INTO LOGIN(username, hash) VALUES(?, ?)', [username, hash], (error, results) => {

                        if (error) {
                            console.log(error);
                            res.status(400).json(error);
                        } else {

                            var secret = speakeasy.generateSecret({
                                name: username
                            });

                            insertMultiFactorSecret(results.insertId, secret.ascii)
                                .then(val =>{
                                    qrcode.toDataURL(secret.otpauth_url, (qrErr, qrData)=>{
                                        res.json({
                                            message: 'User registered successfully',
                                            qr: qrData
                                        });

                                    })
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(400).json("Unexpected error");
                                })
                        }
                    })
                });

            }

        } catch (error) {
            res.status(400).json('Unexpected Error');
        }

    })


module.exports = router; 