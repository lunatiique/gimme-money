import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xB03A2D5de7BAe2B99352fD8337a4473c29eBF60F"
);

export default instance;
