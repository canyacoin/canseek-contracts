var CanYaCoin = artifacts.require("./CanYaCoin.sol");
var Escrow = artifacts.require("./Escrow.sol");
var CanHire = artifacts.require("./CanHire.sol");
const utils = require("tn-truffle-test-utils");
const Web3 = require("web3");

contract("CanHire", accounts => {

  let token;
  let escrow;
  let canHire;
  let tokenContractOwner = accounts[7];
  let escrowContractOwner = accounts[8];
  let canHireOwner = accounts[0];
  let employer1 = accounts[1];
  let employer2 = accounts[2];
  let recruiter1 = accounts[3];
  let recruiter2 = accounts[4];
  let recruiter3 = accounts[5];
  let asset = accounts[9];
  const web3 = new Web3(window.web3.currentProvider);

  beforeEach(async () => {
    token = await utils.deploy(CanYaCoin, {from: tokenContractOwner});
    escrow = await utils.deploy(Escrow, token.address, {from: escrowContractOwner});
    canHire = await utils.deploy(CanHire, token.address, escrow.address, {from: canHireOwner});

    // const gas = await token.buy.estimateGas({from: employer1, value: web3.toWei('2', 'ether')});
    // console.log(gas);
    await token.buy({from: employer1, value: web3.toWei('2', 'ether')});
    await token.buy({from: employer2, value: web3.toWei('1', 'ether')});
    await token.buy({from: recruiter1, value: web3.toWei('1', 'ether')});
    await token.buy({from: recruiter2, value: web3.toWei('1', 'ether')});
    await token.buy({from: recruiter3, value: web3.toWei('1', 'ether')});

    // const employer1Balance = await token.balanceOf(employer1);
    // const employer2Balance = await token.balanceOf(employer2);
    // const recruiter1Balance = await token.balanceOf(recruiter1);
    // const recruiter2Balance = await token.balanceOf(recruiter2);
    // const recruiter3Balance = await token.balanceOf(recruiter3);
    
    // assert(await canHire.active(), "CanHire contract is not active.");
    // assert.equal(employer1Balance.toNumber(), 2857, "wrong empoloyer1 balance");
    // assert.equal(employer2Balance.toNumber(), 1428, "wrong employer2 balance");
    // assert.equal(recruiter1Balance.toNumber(), 1428, "wrong recruiter1 balance");
    // assert.equal(recruiter2Balance.toNumber(), 1428, "wrong recruiter2 balance");
    // assert.equal(recruiter3Balance.toNumber(), 1428, "wrong recruiter3 balance");
  });

  // it("should add 1 new post", async () => {
  //   await token.approve(escrow.address, 1000, {from: employer1});
  //   const gasAddPost = await canHire.addPost.estimateGas("p0sdfasfasfasdfdsf01", 1000, 50, {from: employer1});
  //   console.log(gasAddPost);
    
  //   const numPosts1 = await canHire.numPosts();
  //   const post1 = await canHire.posts(1);
  //   const employer1Balance1 = await token.balanceOf(employer1);
  //   const escrowBalance1 = await token.balanceOf(escrow.address);
  //   // const gas = await canHire.getNumCandidates.estimateGas(1);
  //   // console.log(gas);

  //   assert.equal(numPosts1.toNumber(), 2, "wrong total number of posts");
  //   assert.equal(post1[0].toNumber(), 1, "wrong post id");
  //   assert.equal(post1[1], employer1.toString(), "wrong post owner");
  //   assert.equal(post1[2].toNumber(), 1, "wrong post status");
  //   assert.equal(post1[3].toNumber(), 1000, "wrong post bounty");
  //   assert.equal(post1[4].toNumber(), 50, "wrong post cost");
  //   assert.equal(post1[5].toNumber(), 1000, "wrong post honeyPot");
  //   assert.equal(post1[6].toNumber(), 0, "wrong number of candidates of the post");
  //   // assert.equal(numCandidates1.toNumber(), 0, "wrong candidated selected");
  //   assert.equal(employer1Balance1.toNumber(), 1857, "wrong employer balance");
  //   assert.equal(escrowBalance1.toNumber(), 1000, "wrong escrow balance");
  // });

  // it("should recommend 2 candidates", async () => { 
  //   // employer1 adds a post
  //   await token.approve(escrow.address, 10000, {from: employer1});
  //   await canHire.addPost("p001", 1000, 50, {from: employer1});
    
  //   // // recruiter1 recommends 2 candidates
  //   await token.approve(escrow.address, 100, {from: recruiter1});
  //   const cId1 = await canHire.recommend.estimateGas("0yawLXmjrRMJn5PVXnzB", 1, {from: recruiter1});
  //   console.log(cId1);
  //   // const cId2 = await canHire.recommend("p001c001", 1, {from: recruiter1});

  //   // const recruiter1Balance = await token.balanceOf(recruiter1);
  //   // const newEscrowBalance = await token.balanceOf(escrow.address);
  //   // const newPost = await canHire.posts(1);
  //   // const newNumCandidates = await canHire.getNumCandidates(1);
  // });

  it("test refund", async () => {
    await token.approve(escrow.address, 1000, {from: employer1});
    await canHire.addPost("p001", 500, 50, {from: employer1});
    await canHire.addPost("p002", 500, 50, {from: employer1});

    await token.approve(escrow.address, 150, {from: recruiter1});
    await canHire.recommend("p001c001", 1, {from: recruiter1});
    await canHire.recommend("p001c002", 1, {from: recruiter1});
    await canHire.recommend("p002c001", 2, {from: recruiter1});
    const post = await canHire.posts(1, {from: recruiter1});
    assert.equal(post[5].toNumber(), 600, "wrong honeypot");

    const refund = await canHire.checkContribution(1, {from: recruiter1});
    assert.equal(refund.toNumber(), 100, "wrong escrow refund");

    await canHire.cancelPost(1, {from: employer1});
    // let result = await canHire.getRefund(1, {from: recruiter1});

    const gas = await canHire.getRefund.estimateGas(1, {from: recruiter1});
    console.log('gas', gas);

    // result = result.logs[0].args.cost;
    // assert.equal(result.toNumber(), 0, "wrong escrow result");
  })

  // it("should cancel a post and get refunds", async () => {
  //   await token.approve(escrow.address, 1000, {from: employer1});
  //   await canHire.addPost("p001", 1000, 50, {from: employer1});
  //   await token.approve(escrow.address, 100, {from: recruiter1});
  //   await canHire.recommend("p001c001", 1, {from: recruiter1});
  //   await canHire.recommend("p001c002", 1, {from: recruiter1});
  //   await token.approve(escrow.address, 150, {from: recruiter2});
  //   await canHire.recommend("p001c003", 1, {from: recruiter2});
  //   await canHire.recommend("p001c004", 1, {from: recruiter2});
  //   await canHire.recommend("p001c005", 1, {from: recruiter2});
    
  //   const canHireBalance = await token.balanceOf(canHire.address);
  //   const escrowBalance = await token.balanceOf(escrow.address);
  //   const employer1Balance = await token.balanceOf(employer1);
  //   const recruiter1Balance = await token.balanceOf(recruiter1);
  //   const recruiter2Balance = await token.balanceOf(recruiter2);
  //   const post = await canHire.posts(1);
  //   const cancelFee = await canHire.cancelFee();

  //   assert.equal(canHireBalance.toNumber(), 0, "canHire balance is not zero");
  //   assert.equal(escrowBalance.toNumber(), 1250, "wrong escrow balance");
  //   assert.equal(employer1Balance.toNumber(), 1857, "wrong employer1 balance");
  //   assert.equal(recruiter1Balance.toNumber(), 1328, "wrong recruiter1 balance");
  //   assert.equal(recruiter2Balance.toNumber(), 1278, "wrong recruiter2 balance");
  //   assert.equal(post[2].toNumber(), 1, "post status is not Open");
  //   assert.equal(cancelFee.toNumber(), 1, "wrong cancellation fee");
    
  //   await canHire.cancelPost(1, {from: employer1});

  //   const newCanHireBalance = await token.balanceOf(canHire.address);
  //   const newEscrowBalance = await token.balanceOf(escrow.address);
  //   const newEmployer1Balance = await token.balanceOf(employer1);
  //   const newRecruiter1Balance = await token.balanceOf(recruiter1);
  //   const newRecruiter2Balance = await token.balanceOf(recruiter2);
  //   const newPost = await canHire.posts(1);

  //   assert.equal(newCanHireBalance.toNumber(), 10, "wrong canHire balance");
  //   assert.equal(newEscrowBalance.toNumber(), 250, "wrong escrow balance");
  //   assert.equal(newEmployer1Balance.toNumber(), 2847, "wrong employer1 balance");
  //   assert.equal(newPost[2].toNumber(), 3, "post status is not Cancelled");
    
  //   const candidateId1 = await canHire.getCandidateId("p001c001", 1);
  //   const candidateId2 = await canHire.getCandidateId("p001c002", 1);
  //   const candidateId3 = await canHire.getCandidateId("p001c003", 1);
  //   const candidateId4 = await canHire.getCandidateId("p001c004", 1);
  //   const candidateId5 = await canHire.getCandidateId("p001c005", 1);

  //   assert.equal(candidateId1.toNumber(), 1, "candidateId error 1");
  //   assert.equal(candidateId2.toNumber(), 2, "candidateId error 2");
  //   assert.equal(candidateId3.toNumber(), 3, "candidateId error 3");
  //   assert.equal(candidateId4.toNumber(), 4, "candidateId error 4");
  //   assert.equal(candidateId5.toNumber(), 5, "candidateId error 5");
    
  //   // await canHire.getRefund(1, {recruiter1});
  //   // await canHire.refer(1, 50, {recruiter1}); 
  //   const refund = await canHire.checkContribution(1, {recruiter1});
  //   console.log(refund.toNumber());
  //   // const gas = await canHire.getRefund.estimateGas("0yawLXmjrRMJn5PVXnzB", 1, {recruiter1});
  //   // console.log(gas);
  //   // await canHire.getRefund(1, {recruiter1});
  //   // await canHire.getRefund(1, {recruiter2});
  //   // await canHire.getRefund("p001c004", 1, {recruiter2});
  //   // await canHire.getRefund("p001c005", 1, {recruiter2});
    
  //   // const finalRecruiter1Balance = await token.balanceOf(recruiter1);
  //   // const finalRecruiter2Balance = await token.balanceOf(recruiter2);
  //   // const newCandidateId1 = await canHire.getCandidateId("p001c001", 1);
  //   // const newCandidateId2 = await canHire.getCandidateId("p001c002", 1);
  //   // const newCandidateId3 = await canHire.getCandidateId("p001c003", 1);
  //   // const newCandidateId4 = await canHire.getCandidateId("p001c004", 1);
  //   // const newCandidateId5 = await canHire.getCandidateId("p001c005", 1);
  //   // const finalPost = canHire.posts(1);

  //   // assert.equal(finalRecruiter1Balance.toNumber(), 1428, "wrong recruiter1 balance");
  //   // assert.equal(finalRecruiter2Balance.toNumber(), 1428, "wrong recruiter2 balance");
  //   // assert.equal(newCandidateId1.toNumber(), 0, "refund error 1");
  //   // assert.equal(newCandidateId2.toNumber(), 0, "refund error 2");
  //   // assert.equal(newCandidateId3.toNumber(), 0, "refund error 3");
  //   // assert.equal(newCandidateId4.toNumber(), 0, "refund error 4");
  //   // assert.equal(newCandidateId5.toNumber(), 0, "refund error 5");
  // });

  // it("should close a post", async () => {
  //   await token.approve(escrow.address, 1000, {from: employer1});
  //   await canHire.addPost("p001", 1000, 50, {from: employer1});
  //   await token.approve(escrow.address, 100, {from: recruiter1});
  //   await canHire.recommend("p001c001", 1, {from: recruiter1});
  //   await canHire.recommend("p001c002", 1, {from: recruiter1});
  //   await token.approve(escrow.address, 150, {from: recruiter2});
  //   await canHire.recommend("p001c003", 1, {from: recruiter2});
  //   await canHire.recommend("p001c004", 1, {from: recruiter2});
  //   await canHire.recommend("p001c005", 1, {from: recruiter2});
    
  //   const canHireBalance = await token.balanceOf(canHire.address);
  //   const escrowBalance = await token.balanceOf(escrow.address);
  //   const employer1Balance = await token.balanceOf(employer1);
  //   const recruiter1Balance = await token.balanceOf(recruiter1);
  //   const recruiter2Balance = await token.balanceOf(recruiter2);
  //   const post = await canHire.posts(1);
  //   const cancellationFee = await canHire.cancelFee();

  //   assert.equal(canHireBalance.toNumber(), 0, "canHire balance is not zero");
  //   assert.equal(escrowBalance.toNumber(), 1250, "wrong escrow balance");
  //   assert.equal(employer1Balance.toNumber(), 1857, "wrong employer1 balance");
  //   assert.equal(recruiter1Balance.toNumber(), 1328, "wrong recruiter1 balance");
  //   assert.equal(recruiter2Balance.toNumber(), 1278, "wrong recruiter2 balance");
  //   assert.equal(post[2].toNumber(), 1, "post status is not Open");
  //   assert.equal(cancellationFee.toNumber(), 1, "wrong cancellation fee");
    
  //   const gas = await canHire.closePost.estimateGas(1, 3, {from: employer1});
  //   console.log(gas);

  //   const newCanHireBalance = await token.balanceOf(canHire.address);
  //   const newEscrowBalance = await token.balanceOf(escrow.address);
  //   const newEmployer1Balance = await token.balanceOf(employer1);
  //   const newRecruiter1Balance = await token.balanceOf(recruiter1);
  //   const newRecruiter2Balance = await token.balanceOf(recruiter2);
  //   const newPost = await canHire.posts(1);

  //   assert.equal(newCanHireBalance.toNumber(), 12, "wrong canHire balance");
  //   assert.equal(newEscrowBalance.toNumber(), 0, "wrong escrow balance");
  //   assert.equal(newEmployer1Balance.toNumber(), 1857, "wrong employer1 balance");
  //   assert.equal(newRecruiter1Balance.toNumber(), 1328, "wrong recruiter1 balance");
  //   assert.equal(newRecruiter2Balance.toNumber(), 2516, "wrong recruiter2 balance");
  //   assert.equal(newPost[2].toNumber(), 2, "post status is not Closed");

  //   await canHire.extractProfits(asset, 12, {canHireOwner});
  //   const postExtractionCanHireBalance = await token.balanceOf(canHire.address);
  //   const assetBalance = await token.balanceOf(asset);
  //   assert.equal(postExtractionCanHireBalance.toNumber(), 0, "wrong canHire balance");
  //   assert.equal(assetBalance.toNumber(), 12, "wrong asset balance");

  // });

//   it("should change the cancellation fee", async () => {
//     const fee = await canHire.cancelFee();
//     assert.equal(fee.toNumber(), 1, "wrong cancellation fee");
//     await canHire.setCancelFee(10, {from: canHireOwner});
//     const newFee = await canHire.cancelFee();
//     assert.equal(newFee.toNumber(), 10, "wrong cancellation fee");
//   });

//   it("should change the closing fee", async () => {
//     const fee = await canHire.closeFee();
//     assert.equal(fee.toNumber(), 1, "wrong cancellation fee");
//     await canHire.setCloseFee(7, {from: canHireOwner});
//     const newFee = await canHire.closeFee();
//     assert.equal(newFee.toNumber(), 7, "wrong cancellation fee");
//   });

//   it("should change contract activeness", async () => {
//     await canHire.setActive(false, {from: canHireOwner});
//     const status = await canHire.active();
//     assert(!status, "CanHire contract is active.");
//     await canHire.setActive(true, {from: canHireOwner});
//     const newStatus = await canHire.active();
//     assert(newStatus, "CanHire contract is not active.");
//   });
  
//   it("should get postId", async () => {
//     await token.approve(escrow.address, 1000, {from: employer1});
//     await canHire.addPost("p001", 1000, 50, {from: employer1});
//     const postId = await canHire.getId("p001");
//     assert.equal(postId, 1, "wrong postId.");
//   });

//   it("should get refund", async () => {
//     await token.approve(escrow.address, 1000, {from: employer1});
//     await canHire.addPost("p001", 1000, 50, {from: employer1});
//     await token.approve(escrow.address, 100, {from: recruiter1});
//     await canHire.recommend("p001c001", 1, {from: recruiter1});
//     await canHire.cancelPost(1, {from: employer1});
//     await canHire.getRefund("p001c001", 1, {from: recruiter1});
//     const recruiterBalance = await token.balanceOf(recruiter1);
//     assert.equal(recruiterBalance.toNumber(), 1428)
//   });

})
