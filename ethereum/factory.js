import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x4b1d8755D5D6634bc1ee263291A074D21152c0bA"
);

export default instance;
