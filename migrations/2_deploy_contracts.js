var CanYaCoin = artifacts.require("CanYaCoin");
var Escrow = artifacts.require("Escrow");
var CanHire = artifacts.require("CanHire");

module.exports = async function(deployer) {
  await deployer.deploy(CanYaCoin);
  await deployer.deploy(Escrow, CanYaCoin.address);
  await deployer.deploy(CanHire, CanYaCoin.address, Escrow.address);
  // const CanYaCoinAddr = '0x28dA8B592708ACa18a7a0CBB7D70Cb24056abA24'; //Ropsten
  // const EscrowAddr = '0x0efC3065a808470b67BDbA3ee356c3A8b7e73b11'; //Ropsten
  // const CanHireAddr = '0x8adf9f39b80f474198bb43f89097fec064fc8a3b'; //Ropsten
  // await deployer.deploy(Escrow, CanYaCoinAddr);
  // await deployer.deploy(CanHire, CanYaCoinAddr, Escrow.EscrowAddr);
}