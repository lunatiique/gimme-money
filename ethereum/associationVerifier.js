import web3 from "./web3";
import AssociationVerifier from "./build/AssociationVerifier.json";

const associationVerifier = () => {
    return new web3.eth.Contract(AssociationVerifier.abi);
    };
    
export default associationVerifier;