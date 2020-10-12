const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const fileUpload = require("express-fileupload");
require('dotenv').config();

const loginRouter = require('./routes/session/login');
const registerRouter = require('./routes/session/register');
const filesRouter = require('./routes/files/files');
const signaturesRouter = require('./routes/signatures/signatures');
const encryptionRouter = require('./routes/encryption/encryption');
const usersRouter = require('./routes/users/users');
const logsRouter = require('./routes/logs/logs');
const authMiddleware = require('./middlewares/auth-middleware');

const tEncrypt = require('./utils/encryption.utils');

const app = express();
const PORT = process.env.PORT || 443;

app.use(fileUpload());
app.use(express.json());

app.use('/',express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', authMiddleware, usersRouter);
app.use('/logs', authMiddleware, logsRouter);
app.get('/signatures/:file', authMiddleware, signaturesRouter.getSignature);

app.get('/verify/:file', authMiddleware, signaturesRouter.verifySignature);

app.get('/download/:filename', authMiddleware, filesRouter.downloadFile);

app.get('/files', authMiddleware, filesRouter.getFiles);

app.post('/upload', authMiddleware, filesRouter.uploadFiles);

app.get('/encrypt/:file', authMiddleware, encryptionRouter.encryptFile);
app.get('/decrypt/:file', authMiddleware, encryptionRouter.decryptFile);

https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'certificates', 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificates', 'localhost.pem'))
}, app)
.listen(PORT, ()=>{
    console.log("server running on port " + PORT);
}) 
