const express = require('express');
const router = express.Router();
const connection = require('../../db/db-connection');
const speakeasy = require('speakeasy');
const bcrypt = require('bcrypt');

router.route('/')
    .post((req, res) => {
        let { username, password } = req.body;

        username = username.toLowerCase();

        if (!username || !password) {
            res.status(404).json("Missing fields.");
            return;
        }

        connection.query('SELECT * FROM login WHERE username=?', [username], (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).json([]);
                return;
            }
            if (results.length < 1) {
                res.status(400).json('Username does not exist.');
                return;
            } else {
                bcrypt.compare(password, results[0].hash, function (err, ispwdValid) {
                    if (error) {
                        console.log(error);
                        res.status(400).json('Could not log in.');
                    } else if (ispwdValid) {
                        res.status(200).json({ username: results[0].username });
                    } else {
                        res.status(400).json('Wrong username and password combination.');
                    }
                });
            }
        })


    });

router.route('/verify')
    .post((req, res) => {
        let username = req.body.username;

        if (!username) {
            res.status(404).json("Missing fields.");
            return;
        }

        connection.query('select secret from multifactor, login where login.username=? && multifactor.userId=login.userId;', [username], (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).json([]);
                return;
            }
            if (results.length < 1) {
                res.status(400).json('Value does not exist.');
                return;
            } else {
                let secret = results[0].secret;

                let verified = speakeasy.totp.verify({
                    secret: secret,
                    encoding: 'ascii',
                    token: req.body.token
                })

                if(verified) {
                    res.status(200).json({message: "Verified"});
                } else{
                    res.status(400).json("bad token")
                }
            }
        })

    })

module.exports = router; 