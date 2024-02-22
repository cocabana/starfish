"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.starfishAPi = void 0;
const web3_1 = require("@alephium/web3");
const utils_js_1 = require("./utils.js");
const __1 = require("../");
const demoAccounts_1 = require("./demoAccounts");
class StarfishAPi {
    deployments;
    selectedDidAccount;
    constructor() {
        (0, utils_js_1.setNodeProviderUrl)('http://127.0.0.1:22973');
    }
    get deploys() {
        if (!this.deployments) {
            const url = (0, utils_js_1.getNodeProviderUrl)();
            if (url.startsWith('http://127.0.0.1')) {
                this.deployments = (0, __1.loadDeployments)("devnet");
            }
            else if (url.includes('testnet')) {
                this.deployments = (0, __1.loadDeployments)("testnet");
            }
            else if (url.includes('mainnet')) {
                this.deployments = (0, __1.loadDeployments)("mainnet");
            }
            else {
                throw new Error('Unknown network');
            }
        }
        return this.deployments;
    }
    getDemoAccounts() {
        return demoAccounts_1.demoAccounts.getAccounts();
    }
    async getAccountBalance(address) {
        const b = await web3_1.web3.getCurrentNodeProvider().addresses.getAddressesAddressBalance(address);
        return b.balanceHint;
    }
    async selectDidAccount(address) {
        const demoAccount = demoAccounts_1.demoAccounts.getAccounts().find(a => a === address);
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
    async hasContractAccount(address) {
        return (await this.getContractState(address)) !== undefined;
    }
    async getContractState(address) {
        return await __1.DIDRecord.at(address).fetchState().catch(e => undefined);
    }
    resolveSubContractAddress(identity) {
        const recordId = (0, web3_1.subContractId)(this.getDidRegistrarContractId(), (0, utils_js_1.addressToByteVec)(identity), 0);
        return (0, web3_1.addressFromContractId)(recordId);
    }
    async getDIDLinkedResource(identity) {
        const recordContractAddress = this.resolveSubContractAddress(identity);
        const state = await this.getContractState(recordContractAddress);
        if (!state) {
            throw new Error('No contract state found');
        }
        const start = Number(state.fields.changed.toString()) - 1;
        console.log('changed', state.fields, 'start', start);
        const result = await web3_1.web3.getCurrentNodeProvider().events.getEventsContractContractaddress(recordContractAddress, { start: start, limit: 1 });
        const e = result.events[0];
        if (e.eventIndex === __1.DIDRecord.eventIndex.DIDAttributeChanged) {
            const [add, nField, vField] = e.fields;
            const name = (0, utils_js_1.u256ToString)(nField.value);
            const value = (0, web3_1.hexToString)(vField.value);
            return {
                name,
                value
            };
        }
        throw new Error('No attribute found');
    }
}
exports.starfishAPi = new StarfishAPi();
//# sourceMappingURL=starfishAPi.js.map