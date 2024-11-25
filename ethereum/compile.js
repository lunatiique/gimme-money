const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const crowdfundingPath = path.resolve(__dirname, "contracts", "Crowdfunding.sol");
const associationVerifierPath = path.resolve(__dirname, "contracts", "AssociationVerifier.sol");
const source = fs.readFileSync(crowdfundingPath, "utf8");
const source2 = fs.readFileSync(associationVerifierPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Crowdfunding.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const input2 = {
  language: "Solidity",
  sources: {
    "AssociationVerifier.sol": {
      content: source2,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  "Crowdfunding.sol"
];

const output2 = JSON.parse(solc.compile(JSON.stringify(input2))).contracts[
  "AssociationVerifier.sol"  
];

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}

for (let contract in output2) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output2[contract]
  );
}
