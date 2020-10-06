const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const fileUpload = require("express-fileupload");
const signatures = require('./signatures');
require('dotenv').config();

const loginRouter = require('./routes/session/login');
const registerRouter = require('./routes/session/register');
const filesRouter = require('./routes/files/files');

const app = express();
const PORT = process.env.PORT || 443;

app.use(fileUpload());
app.use(express.json());

app.use('/',express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.get('/signatures/:file', (req, res)=>{
    const file = req.params.file;
    
    const doc = fs.readFileSync(path.join('.', 'file_uploads', file, 'qr.png'));

    res.set({'Content-Type': 'image/png'}).send(doc);
})

app.get('/verify/:file', (req, res)=>{
    let filename = req.params.file.replace(/\s/g,"-");
    res.json(signatures.verifyDocument(path.join('.', 'file_uploads', filename), filename));
})

app.get('/download/:filename', filesRouter.downloadFile);

app.get('/files', (req, res)=>{
    const fileObjects = fs.readdirSync(path.join('.', 'file_uploads'));
    res.json(fileObjects);
})

app.post('/upload', (req, res)=>{
    if(req.files === null){
        return res.status(400).json({ msg: 'No file uploaded'});
    }

    const file = req.files.file;

    const outputRoute = path.join('.', 'file_uploads', file.name.replace(/\s/g,"-"));
    if (!fs.existsSync(outputRoute)){
        fs.mkdirSync(outputRoute);
    }

    file.mv(outputRoute + '/' + file.name.replace(/\s/g,"-"), err => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }
        signatures.signDocument(outputRoute, file.name.replace(/\s/g,"-"))
        res.json({fileName: file.name, filePath: `file_uploads/${file.name}`});
    });
})

https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'certificates', 'localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificates', 'localhost.pem'))
}, app)
.listen(PORT, ()=>{
    console.log("server running on port " + PORT);
}) 
