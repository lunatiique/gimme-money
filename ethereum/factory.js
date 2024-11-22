import web3 from "./web3";
import CrowdfundingFactory from "./build/CrowdfundingFactory.json";

const instance = new web3.eth.Contract(
  CrowdfundingFactory.abi,
  "0x5b8a229FA790dc9981D5cCa270D07f2aDc3DEcc0"
);

export default instance;
