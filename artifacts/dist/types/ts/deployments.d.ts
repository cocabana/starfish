import { DeployContractExecutionResult } from "@alephium/cli";
import { NetworkId } from "@alephium/web3";
import { DIDRecordInstance, DIDRegistrarInstance } from ".";
export type Deployments = {
    deployerAddress: string;
    contracts: {
        DIDRecord: DeployContractExecutionResult<DIDRecordInstance>;
        DIDRegistrar: DeployContractExecutionResult<DIDRegistrarInstance>;
    };
};
export declare function loadDeployments(networkId: NetworkId, deployerAddress?: string): Deployments;
//# sourceMappingURL=deployments.d.ts.map