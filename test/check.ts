import {loadDeployments} from "../artifacts/ts/deployments";
import {binToHex, bs58, encodeContractField} from "@alephium/web3";

const deploys = loadDeployments("devnet");
const recordId = deploys.contracts.DIDRecord.contractInstance.contractId;

console.log("Record contract id:", recordId);

const addressToByteVec = binToHex(bs58.decode("1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH"));

console.log("Address to byte vec:", addressToByteVec);

//0400bee85f379545a2ed9f6cceb331288842f378cf0f04012ad4ac8824aae7d6f80a
//  00bee85f379545a2ed9f6cceb331288842f378cf0f04012ad4ac8824aae7d6f80a

