const EncryptIPFS = artifacts.require("EncryptIPFS");
const SendRequest = artifacts.require("SendRequest");

module.exports = function(deployer) {
  deployer.deploy(EncryptIPFS);
  deployer.deploy(SendRequest);
};
