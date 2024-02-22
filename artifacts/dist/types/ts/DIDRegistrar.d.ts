import { Address, ContractState, TestContractResult, HexString, ContractFactory, EventSubscribeOptions, EventSubscription, TestContractParams, ContractEvent, ContractInstance } from "@alephium/web3";
export declare namespace DIDRegistrarTypes {
    type Fields = {
        didRecordContractId: HexString;
    };
    type State = ContractState<Fields>;
    type DIDRegisteredEvent = ContractEvent<{
        parentContractId: HexString;
        subContractPath: HexString;
        identity: Address;
    }>;
}
declare class Factory extends ContractFactory<DIDRegistrarInstance, DIDRegistrarTypes.Fields> {
    getInitialFieldsWithDefaultValues(): DIDRegistrarTypes.Fields;
    eventIndex: {
        DIDRegistered: number;
    };
    consts: {
        ErrorCodes: {
            InvalidCaller: bigint;
        };
    };
    at(address: string): DIDRegistrarInstance;
    tests: {
        getDIDRecordContractId: (params: TestContractParams<DIDRegistrarTypes.Fields, {
            identity: Address;
            caller: Address;
        }>) => Promise<TestContractResult<HexString>>;
        addressToByteVec: (params: TestContractParams<DIDRegistrarTypes.Fields, {
            address: Address;
        }>) => Promise<TestContractResult<HexString>>;
        register: (params: TestContractParams<DIDRegistrarTypes.Fields, {
            identity: Address;
        }>) => Promise<TestContractResult<null>>;
        setAttribute: (params: TestContractParams<DIDRegistrarTypes.Fields, {
            identity: Address;
            name: bigint;
            value: HexString;
            validity: bigint;
        }>) => Promise<TestContractResult<null>>;
        revokeAttribute: (params: TestContractParams<DIDRegistrarTypes.Fields, {
            identity: Address;
            name: bigint;
            value: HexString;
        }>) => Promise<TestContractResult<null>>;
    };
}
export declare const DIDRegistrar: Factory;
export declare class DIDRegistrarInstance extends ContractInstance {
    constructor(address: Address);
    fetchState(): Promise<DIDRegistrarTypes.State>;
    getContractEventsCurrentCount(): Promise<number>;
    subscribeDIDRegisteredEvent(options: EventSubscribeOptions<DIDRegistrarTypes.DIDRegisteredEvent>, fromCount?: number): EventSubscription;
}
export {};
//# sourceMappingURL=DIDRegistrar.d.ts.map