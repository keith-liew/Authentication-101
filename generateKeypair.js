const crypto = require("crypto");
const fs = require("fs");

function generateKeypair() {
    const keypair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type:"pkcs1",
            format: "pem"
        },
        privateKeyEncoding: {
            type:"pkcs1",
            format: "pem"
        }
    });

    fs.writeFileSync(__dirname+"/id_rsa_pub.pem", keypair.publicKey);
    fs.writeFileSync(__dirname+"/id_rsa_priv.pem", keypair.privateKey);
}

generateKeypair();