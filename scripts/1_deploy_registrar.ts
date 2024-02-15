import { Deployer, DeployFunction } from "@alephium/cli";
import {DIDRegistrar, DIDRegistrarTypes} from "../artifacts/ts";

const deploy: DeployFunction = async (deployer: Deployer): Promise<void> => {
  const recordSubcontractResult = deployer.getDeployContractResult("DIDRecord");
  const initialFields: DIDRegistrarTypes.Fields = {
    didRecordContractId: recordSubcontractResult.contractInstance.contractId
  };
  const result = await deployer.deployContract(DIDRegistrar, {
    initialFields,
  });

  console.log("Deployed 'Registrar' with initial state");
  console.table(initialFields);
  console.log(`Contract id: ${result.contractInstance.contractId}`);
  console.log(`Contract address: ${result.contractInstance.address}`);
  console.log(`Contract group: ${result.contractInstance.groupIndex}`);
};

export default deploy;