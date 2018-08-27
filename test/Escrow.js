// var CanYaCoin = artifacts.require("./CanYaCoin.sol");
// var Escrow = artifacts.require("./Escrow.sol");
// const utils = require("tn-truffle-test-utils");

// contract("Escrow", accounts => {

//   let token;
//   let escrow;
//   let tokenContractOwner = accounts[0];
//   let escrowContractOwner = accounts[1];
//   let canYaApp = accounts[2];
//   let user1 = accounts[3];
//   let user2 = accounts[4];

//   beforeEach(async () => {
//     token = await utils.deploy(CanYaCoin, {from: tokenContractOwner});
//     escrow = await utils.deploy(Escrow, token.address, {from: escrowContractOwner});
//   })

//   it("should transfer to the escrow", async () => {
//     await token.buy({from: user1, value: web3.toWei('1', 'ether')});
//     const userBalance = await token.balanceOf(user1)
//     assert.equal(userBalance.toNumber(), 1428);
//     const canYaAppBalanceInEscrow = await escrow.getAppBalance({from: canYaApp});
//     assert.equal(canYaAppBalanceInEscrow.toNumber(), 0);
//     const escrowBalance = await token.balanceOf(escrow.address);
//     assert.equal(escrowBalance.toNumber(), 0);

//     await token.approve(escrow.address, 1000, {from: user1});
//     const txid = await escrow.transferToEscrow(user1, 1000, {from: canYaApp});

//     const newUserBalance = await token.balanceOf(user1);
//     const newEscrowBalance = await token.balanceOf(escrow.address);
//     const newCanYaAppBalanceInEscrow = await escrow.getAppBalance({from: canYaApp});
//     assert.equal(newUserBalance.toNumber(), 428, "wrong user balance");
//     assert.equal(newEscrowBalance.toNumber(), 1000, "wrong escrow balance");
//     assert.equal(newCanYaAppBalanceInEscrow.toNumber(), 1000, "wrong canya app balance in escrow");
//   })
  
//   it("should transfer to the user", async () => {
//     await token.buy({from: user1, value: web3.toWei('1', 'ether')});
//     await token.approve(escrow.address, 1000, {from: user1});
//     await escrow.transferToEscrow(user1, 1000, {from: canYaApp});

//     const escrowBalance = await token.balanceOf(escrow.address);
//     const canYaAppBalanceInEscrow = await escrow.getAppBalance({from: canYaApp});
//     const userBalance = await token.balanceOf(user2);
//     assert.equal(canYaAppBalanceInEscrow.toNumber(), 1000, "wrong initial canya app balance in escrow");
//     assert.equal(escrowBalance.toNumber(), 1000, "wrong initial escrow balance");
//     assert.equal(userBalance.toNumber(), 0, "wrong initial user balance");

//     const txid = await escrow.transferFromEscrow(user2, 999, {from: canYaApp});

//     const newEscrowBalance = await token.balanceOf(escrow.address);
//     const newUserBalance = await token.balanceOf(user2);
//     const newCanYaAppBalanceInEscrow = await escrow.getAppBalance({from: canYaApp});
//     assert.equal(newEscrowBalance.toNumber(), 1, "wrong final escrow balance");
//     assert.equal(newCanYaAppBalanceInEscrow.toNumber(), 1, "wrong final canya app balance in escrow");
//     assert.equal(newUserBalance.toNumber(), 999, "wrong final user balance");
//   })

// })
