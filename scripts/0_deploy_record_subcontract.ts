import { Deployer, DeployFunction } from "@alephium/cli";
import {DIDRecord, DIDRecordTypes} from "../artifacts/ts";
import {ZERO_ADDRESS} from "@alephium/web3";

const deploy: DeployFunction = async (deployer: Deployer): Promise<void> => {
  const initialFields: DIDRecordTypes.Fields = { identity: ZERO_ADDRESS, owner: ZERO_ADDRESS, changed: 0n }
  const result = await deployer.deployContract(DIDRecord, {
    initialFields,
  });

  console.log("Deployed 'Record' contract template with initial state");
  console.table(initialFields);
  console.log(`Contract id: ${result.contractInstance.contractId}`);
  console.log(`Contract address: ${result.contractInstance.address}`);
  console.log(`Contract group: ${result.contractInstance.groupIndex}`);
};

export default deploy;
