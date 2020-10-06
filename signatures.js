const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const qrcode = require('qrcode');

const private_key = fs.readFileSync('keys/privateKey.pem', 'utf-8');
const public_key = fs.readFileSync('keys/publicKey.pem', 'utf-8');

const signDocument = (filePath, fileName) => {
    const doc = fs.readFileSync(path.join(filePath, fileName));

    const signer = crypto.createSign('RSA-SHA256');
    signer.write(doc);
    signer.end();

    const signature = signer.sign(private_key, 'base64')

    fs.writeFileSync(path.join(filePath, 'signature.txt'), signature);

    generateQRSignature(filePath, fileName);
}

const verifyDocument = (filePath, fileName) => {
    const signature = fs.readFileSync(path.join(filePath, 'signature.txt'), 'utf-8');

    const doc = fs.readFileSync(path.join(filePath, fileName));

    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.write(doc);
    verifier.end();

    return verifier.verify(public_key, signature, 'base64');
}

async function generateQRSignature(filePath, fileName="") {
    const signature = fs.readFileSync(path.join(filePath, 'signature.txt'), 'utf-8');

    const content = "signature:"+signature + "&File:" + fileName + "&SignedBy:MauricioDuran";
    console.log(content);
    await qrcode.toFile(path.join(filePath, 'qr.png'), content);

}

module.exports = {
    signDocument,
    verifyDocument
}
