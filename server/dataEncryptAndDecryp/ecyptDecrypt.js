//Hashed data can not be decrypted with a specific key, like encrypted data.

//crypto is a built-in library in Node.js. Thus it doesn’t require installation and configuration before 
//using it in your Node.js applications. The crypto module handles an algorithm that performs encryption 
//and decryption of data.

// include crypto module
const crypto = require("crypto")
 
// set encryption algorithm
const algorithm = 'aes-256-cbc'
 
// private key
const key = process.env.privatekey 
 
function encrypt(message){
        // random 16 digit initialization vector
        const iv = crypto.randomBytes(16);
     
        // encrypt the string using encryption algorithm, private key and initialization vector
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        
        let encryptedData = cipher.update(message, "utf-8", "hex");
        
        encryptedData += cipher.final("hex");
     
        // convert the initialization vector to base64 string
        const base64data = Buffer.from(iv, 'binary').toString('base64');

        return {encryptedData, base64data};
}

function decrypt(encryptedData, iv){
    // convert initialize vector from base64 to buffer
    const origionalData = Buffer.from(iv, 'base64') 

    // decrypt the string using encryption algorithm and private key
    const decipher = crypto.createDecipheriv(algorithm, key, origionalData);
    
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    
    decryptedData += decipher.final("utf8");

    return decryptedData;
}

module.exports = {encrypt, decrypt}