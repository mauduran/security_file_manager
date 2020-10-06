const path = require('path');
const fs = require('fs');

const downloadFile = (req, res)=>{
    let filename = req.params.filename.replace(/\s/g,"-");

    let file = path.join('.', 'file_uploads', filename, filename);

    if(fs.existsSync(file)){
        res.download(file);
    } else {
        res.status(400).json("File does not exist.");
    } 
};

// app.get('/files', (req, res)=>{
//     const fileObjects = fs.readdirSync(path.join('.', 'file_uploads'));
//     res.json(fileObjects);
// })

// app.post('/upload', (req, res)=>{
//     if(req.files === null){
//         return res.status(400).json({ msg: 'No file uploaded'});
//     }

//     const file = req.files.file;

//     const outputRoute = path.join('.', 'file_uploads', file.name.replace(/\s/g,"-"));
//     if (!fs.existsSync(outputRoute)){
//         fs.mkdirSync(outputRoute);
//     }

//     file.mv(outputRoute + '/' + file.name.replace(/\s/g,"-"), err => {
//         if(err){
//             console.log(err);
//             return res.status(500).send(err);
//         }
//         signatures.signDocument(outputRoute, file.name.replace(/\s/g,"-"))
//         res.json({fileName: file.name, filePath: `file_uploads/${file.name}`});
//     });
// })

module.exports = {
    downloadFile
}