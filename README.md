# GIMME MONEY

Project carried out by Lucie ABI CHAAYA, Kevin GUYADER, Pauline MELIN and Luna SCHENK for GS16 cours at the University of Technologie of Troyes.

## Description

Gimme Money is a crowdfunding platform that allows users to create crowdfundings to raise money for their projects. The platform is built on the Ethereum blockchain and uses smart contracts to manage the crowdfundings. It was created with the purpose of learning about blockchain technology and showing the advantages of using it in a crowdfunding platform.

Realized as a school project, this github repository is a proof of concept. It is not intended to be used in a production environment.

## Launch the project

### Prerequisites

- Node.js

### Installation

1. Clone the repository
```bash
git clone https://github.com/lunatiique/gimme-money
```
2. Install the dependencies
```bash
npm install --legacy-peer-deps
```
3. Start the project
```bash
npm start
cd data
node data_server.js
```
4. Open your browser and go to http://localhost:3000
5. You can now create a crowdfunding, contribute to existing ones or verify your association.
6. To test the project, you can use the Metamask extension on your browser. You can find more information about Metamask [here](https://metamask.io/).
7. Warning : if after starting the project, it runs in an infinite loop and does't start the website : delete the `.next` folder (cache issues).

## How to deploy the smart contract

1. Go to the `ethereum` directory
```bash
cd ethereum
```
2. Compile the smart contract
```bash
node compile.js
```
3. Deploy the smart contract
```bash
node deploy_crowdfunding.js
node deploy_verifier.js
```
1. Copy the address of each deployed contract and paste it in the corresponding factory file (`ethereum/factory_crowdfunding.js` or `ethereum/factory_verifier.js`).
2. You can now start the project.
