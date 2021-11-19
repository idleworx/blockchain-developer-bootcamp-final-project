var MultiRenter = artifacts.require("./MultiRenter.sol");

module.exports = function(deployer) {
  deployer.deploy(MultiRenter, "10000000000000000"); //0.01 ETH
};
