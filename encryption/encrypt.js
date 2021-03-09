const Wallet = require('ethereumjs-wallet')
const crypto = require('crypto')


const privateKey1 = Buffer.from("50d48e68880d6bf9a8f1c00887621ef8829b43758e8d24e7dde64ebbeaa3a1f5", "hex")
const wallet1 = Wallet.fromPrivateKey(privateKey1)

const publicKey1 = wallet1.getPublicKey()

console.log(wallet1.getPublicKeyString())

console.log(wallet1.getAddress())


console.log(wallet1.getPublicKey())




//const data = "Nirmit"

//const buffered_data = Buffer.from(data, 'base64')
//console.log("nirmit : " + buffered_data)

//const encrypted = crypto.publicEncrypt(publicKey1, buffered_data)

// console.log(encrypted.toString('base64'))


// function decrypt(toDecrypt, relativeOrAbsolutePathtoPrivateKey) {
//   const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey)
//   const privateKey = fs.readFileSync(absolutePath, 'utf8')
//   const buffer = Buffer.from(toDecrypt, 'base64')
//   const decrypted = crypto.privateDecrypt(
//     {
//       key: privateKey.toString(),
//       passphrase: '',
//     },
//     buffer,
//   )
//   return decrypted.toString('utf8')
// }