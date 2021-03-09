const ecies = require("eth-ecies");
const Wallet = require('ethereumjs-wallet')


const privateKey1 = Buffer.from("50d48e68880d6bf9a8f1c00887621ef8829b43758e8d24e7dde64ebbeaa3a1f5", "hex")
const wallet1 = Wallet.fromPrivateKey(privateKey1)

const publicKey1 = wallet1.getPublicKey()

console.log("Private key : " , publicKey1)
console.log("Public key : " , publicKey1)

let plaintext = Buffer.from("Nirmit", "utf-8");
let encryptedMsg = ecies.encrypt(publicKey1, plaintext);
console.log("Encrypted message : " , encryptedMsg)

// const privateKey2 = Buffer.from("50d48e68880d6bf9a8f1c00887621ef8829b43758e8d24e7dde64ebbeaa3a1f0", "hex")
// let decryptedMsg = ecies.decrypt(privateKey2, encryptedMsg);

let decryptedMsg = ecies.decrypt(privateKey1, encryptedMsg);
console.log("Decrypted message : " , decryptedMsg.toString())