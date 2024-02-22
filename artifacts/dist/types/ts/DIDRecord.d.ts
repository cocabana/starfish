import { Address, ContractState, TestContractResult, HexString, ContractFactory, EventSubscribeOptions, EventSubscription, CallContractParams, CallContractResult, TestContractParams, ContractEvent, ContractInstance } from "@alephium/web3";
export declare namespace DIDRecordTypes {
    type Fields = {
        identity: Address;
        owner: Address;
        changed: bigint;
    };
    type State = ContractState<Fields>;
    type DIDOwnerChangedEvent = ContractEvent<{
        identity: Address;
        owner: Address;
    }>;
    type DIDAttributeChangedEvent = ContractEvent<{
        identity: Address;
        name: bigint;
        value: HexString;
        validTo: bigint;
    }>;
    interface CallMethodTable {
        getOwner: {
            params: Omit<CallContractParams<{}>, "args">;
            result: CallContractResult<Address>;
        };
    }
    type CallMethodParams<T extends keyof CallMethodTable> = CallMethodTable[T]["params"];
    type CallMethodResult<T extends keyof CallMethodTable> = CallMethodTable[T]["result"];
    type MultiCallParams = Partial<{
        [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
    }>;
    type MultiCallResults<T extends MultiCallParams> = {
        [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable ? CallMethodTable[MaybeName]["result"] : undefined;
    };
}
declare class Factory extends ContractFactory<DIDRecordInstance, DIDRecordTypes.Fields> {
    getInitialFieldsWithDefaultValues(): DIDRecordTypes.Fields;
    eventIndex: {
        DIDOwnerChanged: number;
        DIDAttributeChanged: number;
    };
    consts: {
        ErrorCodes: {
            InvalidCaller: bigint;
        };
    };
    at(address: string): DIDRecordInstance;
    tests: {
        getOwner: (params: Omit<TestContractParams<DIDRecordTypes.Fields, never>, "testArgs">) => Promise<TestContractResult<Address>>;
        setOwner: (params: TestContractParams<DIDRecordTypes.Fields, {
            newOwner: Address;
        }>) => Promise<TestContractResult<null>>;
        setAttribute: (params: TestContractParams<DIDRecordTypes.Fields, {
            actor: Address;
            name: bigint;
            value: HexString;
            validity: bigint;
        }>) => Promise<TestContractResult<null>>;
        revokeAttribute: (params: TestContractParams<DIDRecordTypes.Fields, {
            actor: Address;
            name: bigint;
            value: HexString;
        }>) => Promise<TestContractResult<null>>;
    };
}
export declare const DIDRecord: Factory;
export declare class DIDRecordInstance extends ContractInstance {
    constructor(address: Address);
    fetchState(): Promise<DIDRecordTypes.State>;
    getContractEventsCurrentCount(): Promise<number>;
    subscribeDIDOwnerChangedEvent(options: EventSubscribeOptions<DIDRecordTypes.DIDOwnerChangedEvent>, fromCount?: number): EventSubscription;
    subscribeDIDAttributeChangedEvent(options: EventSubscribeOptions<DIDRecordTypes.DIDAttributeChangedEvent>, fromCount?: number): EventSubscription;
    subscribeAllEvents(options: EventSubscribeOptions<DIDRecordTypes.DIDOwnerChangedEvent | DIDRecordTypes.DIDAttributeChangedEvent>, fromCount?: number): EventSubscription;
    methods: {
        getOwner: (params?: DIDRecordTypes.CallMethodParams<"getOwner">) => Promise<DIDRecordTypes.CallMethodResult<"getOwner">>;
    };
    multicall<Calls extends DIDRecordTypes.MultiCallParams>(calls: Calls): Promise<DIDRecordTypes.MultiCallResults<Calls>>;
}
export {};
//# sourceMappingURL=DIDRecord.d.ts.map