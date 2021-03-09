const Wallet = require('ethereumjs-wallet')
const privateKey = Buffer.from("50d48e68880d6bf9a8f1c00887621ef8829b43758e8d24e7dde64ebbeaa3a1f5", "hex")
const wallet = Wallet.fromPrivateKey(privateKey)

//console.log(wallet.getPublicKeyString())

console.log(wallet.getPublicKey())