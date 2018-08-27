// // const web3 = new Web3(web3.currentProvider);
// const CanYaCoin = artifacts.require('CanYaCoin');

// contract('CanYaCoin', accounts => {
//   let token;

//   beforeEach(async function () {
//     token = await CanYaCoin.new({from: accounts[0]});
//   });

//   it('should return token contract basic info', async function () {
//     assert.equal(await token.name(), 'CanYaCoin');
//     assert.equal(await token.symbol(), 'CAN');
//     assert.equal(await token.decimals(), 8);
//     const buyPrice = await token.buyPrice();
//     assert.equal(buyPrice.toNumber(), 7e+14);
//   });

//   it('should get ETH balance of default user account', async function () {
//     const balance = web3.fromWei(await web3.eth.getBalance(accounts[0]), 'ether');
//     assert(balance > 0, 'ETH should be greater than 0');
//   });

//   it('should get ETH balance of deployed CanYaCoin token contract', async function () {
//     const balance = web3.fromWei(await web3.eth.getBalance(token.address), 'ether');
//     assert.equal(balance, '0');
//   });

//   it('should get CAN balance', async function () {
//     const balance = await token.balanceOf(accounts[0]);
//     assert.strictEqual(balance.toNumber(), 0);
//   });

//   it('should transfer CAN from default user account to another account', async function () {
//     const fromBalance = await token.balanceOf(accounts[0])
//     assert.equal(fromBalance.toNumber(), 0);
//     const toBalance = await token.balanceOf(accounts[1])
//     assert.equal(toBalance.toNumber(), 0);

//     await token.buy({value: web3.toWei('1', 'ether')});
//     const txid = await token.transfer(accounts[1], 428);

//     const newFromBalance = await token.balanceOf(accounts[0]);
//     assert.equal(newFromBalance.toNumber(), 1000);
//     const newToBalance = await token.balanceOf(accounts[1]);
//     assert.equal(newToBalance.toNumber(), 428);
//   });

//   it('should buy CAN tokens', async function () {
//     const contractBalance = await token.balanceOf(token.address);
//     const balance = await token.balanceOf(accounts[0]);
//     assert.equal(contractBalance.toNumber(), 1000000000000);
//     assert.equal(balance.toNumber(), 0);

//     const txid = await token.buy({value: web3.toWei('1', 'ether')});

//     const newContractBalance = await token.balanceOf(token.address);
//     const newBalance = await token.balanceOf(accounts[0]);
//     assert.equal(newContractBalance.toNumber(), 999999998572);
//     assert.equal(newBalance.toNumber(), 1428);

//     // check that token contract ETH balance is > 0
//     const ethBalance = web3.fromWei(await web3.eth.getBalance(token.address), 'ether');
//     assert.equal(ethBalance, '1');
//   });

// });
