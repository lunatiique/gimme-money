const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CrowdfundingFactory.json");
const compiledCrowdfunding = require("../ethereum/build/Crowdfunding.json");

let accounts;
let factory;
let crowdfundingAddress;
let crowdfunding;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1400000" });

  await factory.methods.createCrowdfunding("100").send({
    from: accounts[0],
    gas: "2000000"
  });

  [crowdfundingAddress] = await factory.methods.getDeployedCrowdfundings().call();
  crowdfunding = await new web3.eth.Contract(compiledCrowdfunding.abi, crowdfundingAddress);
});

describe("Crowdfundings", () => {
  it("deploys a factory and a crowdfunding", () => {
    assert.ok(factory.options.address);
    assert.ok(crowdfunding.options.address);
  });

  it("marks caller as the crowdfunding manager", async () => {
    const manager = await crowdfunding.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await crowdfunding.methods.contribute().send({
      value: "200",
      from: accounts[1]
    });
    const isContributor = await crowdfunding.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await crowdfunding.methods.contribute().send({
        value: "5",
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows a manager to make a payment request", async () => {
    await crowdfunding.methods
      .createRequest("Buy batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000"
      });
    const request = await crowdfunding.methods.requests(0).call();

    assert.equal("Buy batteries", request.description);
  });

  it("processes requests", async () => {
    await crowdfunding.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether")
    });

    await crowdfunding.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await crowdfunding.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });

    await crowdfunding.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    assert(balance > 104);
  });
});
