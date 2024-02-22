import {Address, Asset, binToHex, bs58, ContractState, Fields, ONE_ALPH} from "@alephium/web3";
import {DIDRecord, DIDRecordTypes, DIDRegistrar} from "../artifacts/ts";
import { randomBytes } from "crypto"
import {randomContractAddress} from "@alephium/web3-test";

export function randomAssetAddress(): string {
  const prefix = Buffer.from([0x00])
  const bytes = Buffer.concat([prefix, randomBytes(32)])
  return bs58.encode(bytes)
}

export const defaultInitialAsset: Asset = {
  alphAmount: ONE_ALPH
}

export class ContractFixture<T extends Fields> {
  selfState: ContractState<T>
  dependencies: ContractState[]
  address: string
  contractId: string

  states(): ContractState[] {
    return this.dependencies.concat([this.selfState])
  }

  initialFields(): T {
    return this.selfState.fields
  }

  constructor(selfState: ContractState<T>, dependencies: ContractState[]) {
    this.selfState = selfState
    this.dependencies = dependencies
    this.address = selfState.address
    this.contractId = selfState.contractId
  }
}

export function createRecord(address: string, identity: string): ContractState<DIDRecordTypes.Fields> {
  return DIDRecord.stateForTest(
    {
      identity,
      owner: identity,
      changed: 0n,
    },
    undefined,
    address
  );
}


export function createRegistrar(owner: string) {
  const primaryRecordTemplate = createRecord(randomContractAddress(), randomAssetAddress())
  const state = DIDRegistrar.stateForTest({
    didRecordContractId: primaryRecordTemplate.contractId
  }, defaultInitialAsset)
  return new ContractFixture(state, [primaryRecordTemplate])
}

export function addressToByteVec(address: string) {
  return binToHex(bs58.decode(address));
}