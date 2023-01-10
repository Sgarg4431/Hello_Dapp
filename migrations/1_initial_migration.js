const hello = artifacts.require("Hello");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(hello);
};