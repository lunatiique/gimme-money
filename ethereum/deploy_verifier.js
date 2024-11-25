const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/AssociationVerifier.json");

const provider = new HDWalletProvider(
  "decrease banana sure target civil label advance snake club imitate position neck",
  "https://sepolia.infura.io/v3/009e0fca56844ba48ed8d89c58051e3d"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy Association Verifier contract from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "2000000", from: accounts[0] });

  console.log("Association Verifier Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
