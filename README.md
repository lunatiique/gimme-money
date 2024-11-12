# GIMME MONEY
Project carried out by Lucie ABI CHAAYA, Kevin GUYADER, Pauline MELIN and Luna SCHENK for GS16 cours at the University of Technologie of Troyes.
## Description
Gimme Money is a crowdfunding platform that allows users to create campaigns to raise money for their projects. The platform is built on the Ethereum blockchain and uses smart contracts to manage the campaigns. It was created with the purpose of learning about blockchain technology and showing the advantages of using it in a crowdfunding platform.
            
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
```
4. Open your browser and go to http://localhost:3000
5. You can now create a campaign and contribute to existing ones.
6. To test the project, you can use the Metamask extension on your browser. You can find more information about Metamask [here](https://metamask.io/).

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
node deploy.js
```
4. Copy the address of the deployed contract and paste it in the `ethereum/factory.js` file
5. You can now start the project
