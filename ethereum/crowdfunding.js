import web3 from "./web3";
import Crowdfunding from "./build/Crowdfunding.json";

const crowdfunding = (address) => {
  return new web3.eth.Contract(Crowdfunding.abi, address);
};
export default crowdfunding;
