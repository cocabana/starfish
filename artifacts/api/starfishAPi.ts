import {addressFromContractId, hexToString, subContractId, web3} from "@alephium/web3";
import {addressToByteVec, u256ToString} from "./utils.js";
import {DIDRecord, loadDeployments} from "../"
import {Deployments} from "../ts/deployments";
import {demoAccounts} from "./demoAccounts";

class StarfishAPi {

  deployments: Deployments;
  private selectedDidIndex: number = 0;

  constructor() {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973');
  }


  setCurrentNodeProvider(url: string) {
    web3.setCurrentNodeProvider(url);
  }

  get deploys() {
    if (!this.deployments) {
      this.deployments = loadDeployments("devnet");
    }
    return this.deployments;
  }

  async getDemoAccounts() {
    return demoAccounts.map(s => s.address);
  }

  async getAccountBalance(address: string) {
    const b = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address);
    return b.balanceHint;
  }

  async selectDidAccount(i: number) {
    if (i < 0 || i >= demoAccounts.length) {
      throw new Error('Invalid index! Must be a value between 1 and ' + demoAccounts.length + ' inclusively.');
    }
    this.selectedDidIndex = i;
    return this.getDIDAccount();
  }

  async getDIDAccount() {
    const address = demoAccounts[this.selectedDidIndex].address;
    return {
      did: `did:alph:${address}`,
      address
    };
  }

  getDidRegistrarContractId() {
    return this.deploys.contracts.DIDRegistrar.contractInstance.contractId;
  }

  async hasContractAccount(address: string):Promise<boolean> {
    return (await this.getContractState(address)) !== undefined;
  }

  async getContractState(address: string) {
    console.log('getContractState', address);
    return await DIDRecord.at(address).fetchState().catch(e => undefined);
  }

  resolveSubContractAddress(identity: string) {
    const recordId = subContractId(this.getDidRegistrarContractId(), addressToByteVec(identity), 0);
    return addressFromContractId(recordId);
  }

  async getDIDLinkedResource(identity: string) {
    const recordContractAddress = this.resolveSubContractAddress(identity);
    const state = await this.getContractState(recordContractAddress);
    if (!state) {
      throw new Error('No contract state found');
    }
    const start = Number(state.fields.changed.toString()) - 1;
    console.log('changed', state.fields, 'start', start);
    const result = await web3.getCurrentNodeProvider().events.getEventsContractContractaddress(recordContractAddress, { start: start, limit: 1 });
    //console.log(JSON.stringify(result, null, 2))
    const e = result.events[0];
    //TODO - check for other events
    if(e.eventIndex === DIDRecord.eventIndex.DIDAttributeChanged) {
      const [add, nField, vField] = e.fields;
      const name = u256ToString(nField.value as any);
      const value = hexToString(vField.value as any);
      //console.log('FOUND name:', name, 'value:', value);
      return {
        name,
        value
      }
    }
    throw new Error('No attribute found');
  }

}
export const starfishAPi = new StarfishAPi();