
import {addressFromContractId, hexToString, subContractId, web3} from "@alephium/web3";
import {addressToByteVec, getNodeProviderUrl, setNodeProviderUrl, u256ToString} from "./utils.js";
import {DIDRecord, loadDeployments} from "../"
import {Deployments} from "../ts/deployments";
import {demoAccounts} from "./demoAccounts";

class StarfishAPi {

  private deployments: Deployments;
  private selectedDidAccount: string;

  constructor() {
    setNodeProviderUrl('http://127.0.0.1:22973');
  }

  get deploys() {
    if (!this.deployments) {
      const url = getNodeProviderUrl();
      if (url.startsWith('http://127.0.0.1')) {
        this.deployments = loadDeployments("devnet");
      }
      else if(url.includes('testnet')) {
        this.deployments = loadDeployments("testnet");
      }
      else if (url.includes('mainnet')) {
        this.deployments = loadDeployments("mainnet");
      }
      else {
        throw new Error('Unknown network');
      }
    }
    return this.deployments;
  }

  getDemoAccounts() {
    return demoAccounts.getAccounts();
  }

  async getAccountBalance(address: string) {
    const b = await web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address);
    return b.balanceHint;
  }

  async selectDidAccount(address: string) {
    const demoAccount = demoAccounts.getAccounts().find(a => a === address);
    if (!demoAccount) {
      throw new Error(`Address ${address} is not a demo account`);
    }
    this.selectedDidAccount = demoAccount;
  }

  getDIDAccount() {
    if (!this.selectedDidAccount) {
      throw new Error('No selected account');
    }
    return {
      did: `did:alph:${this.selectedDidAccount}`,
      address: this.selectedDidAccount,
    };
  }

  getDidRegistrarContractId() {
    return this.deploys.contracts.DIDRegistrar.contractInstance.contractId;
  }

  async hasContractAccount(address: string):Promise<boolean> {
    return (await this.getContractState(address)) !== undefined;
  }

  async getContractState(address: string) {
    // console.log('getContractState', address);
    return await DIDRecord.at(address).fetchState().catch(e => undefined);
  }

  resolveSubContractAddress(identity: string) {
    return addressFromContractId(this.resolveSubContractId(identity));
  }

  resolveSubContractId(identity: string) {
    return subContractId(this.getDidRegistrarContractId(), addressToByteVec(identity), 0);
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