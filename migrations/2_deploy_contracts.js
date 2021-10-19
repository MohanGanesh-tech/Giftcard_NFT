var Giftcard = artifacts.require("./contracts/Giftcard.sol");

module.exports = function(deployer) {
  deployer.deploy(Giftcard);
};
