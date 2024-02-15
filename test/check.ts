import {loadDeployments} from "../artifacts/ts/deployments";

const deploys = loadDeployments("devnet");
const recordId = deploys.contracts.DIDRecord.contractInstance.contractId;

console.log("Record contract id:", recordId);