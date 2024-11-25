import web3 from "./web3";
import AssociationVerifier from "./build/AssociationVerifier.json";

const instance = new web3.eth.Contract(
  AssociationVerifier.abi,
  "0x9312b59fcF8DDF81e7d8a97be5FF2D03ebb05187"
);

export default instance;
