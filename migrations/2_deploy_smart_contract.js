const DonationAndCustomization = artifacts.require("DonationAndCustomization");

module.exports = function(deployer) {
  deployer.deploy(DonationAndCustomization);
};