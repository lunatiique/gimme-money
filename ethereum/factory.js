import web3 from "./web3";
import CrowdfundingFactory from "./build/CrowdfundingFactory.json";

const instance = new web3.eth.Contract(
  CrowdfundingFactory.abi,
  "0x1025DaCC63AdF201aBe5CdA6991b95C0a1bb00aB"
);

export default instance;
