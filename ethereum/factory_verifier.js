import web3 from "./web3";
import AssociationVerifier from "./build/AssociationVerifier.json";

const instance = new web3.eth.Contract(
  AssociationVerifier.abi,
  "0x68c2A52728aa99D44848eF3e4e379B8AF17E5d5e"
);

export default instance;
