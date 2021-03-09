const Wallet = require('ethereumjs-wallet')
const crypto = require('crypto')
const secp256k1 = require('secp256k1/elliptic')


const privateKey1 = Buffer.from("50d48e68880d6bf9a8f1c00887621ef8829b43758e8d24e7dde64ebbeaa3a1f5", "hex")
const wallet1 = Wallet.fromPrivateKey(privateKey1)

const publicKey1 = wallet1.getPublicKey()


let msg = new Uint8Array(32)

// sign the message
const sigObj = secp256k1.ecdsaSign(msg, privateKey1)
 
// verify the signature
console.log(secp256k1.ecdsaVerify(sigObj.signature, msg, publicKey1))







// var prime_length = 60;
// var diffHell = crypto.createDiffieHellman(prime_length);

// diffHell.generateKeys('base64');
// console.log("Public Key : " ,diffHell.getPublicKey('base64'));
// console.log("Private Key : " ,diffHell.getPrivateKey('base64'));

// console.log("Public Key : " ,diffHell.getPublicKey('hex'));
// console.log("Private Key : " ,diffHell.getPrivateKey('hex'));


