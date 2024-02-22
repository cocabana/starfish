"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDRegistrarInstance = exports.DIDRegistrar = void 0;
const web3_1 = require("@alephium/web3");
const DIDRegistrar_ral_json_1 = __importDefault(require("../DIDRegistrar.ral.json"));
class Factory extends web3_1.ContractFactory {
    getInitialFieldsWithDefaultValues() {
        return this.contract.getInitialFieldsWithDefaultValues();
    }
    eventIndex = { DIDRegistered: 0 };
    consts = { ErrorCodes: { InvalidCaller: BigInt(0) } };
    at(address) {
        return new DIDRegistrarInstance(address);
    }
    tests = {
        getDIDRecordContractId: async (params) => {
            return (0, web3_1.testMethod)(this, "getDIDRecordContractId", params);
        },
        addressToByteVec: async (params) => {
            return (0, web3_1.testMethod)(this, "addressToByteVec", params);
        },
        register: async (params) => {
            return (0, web3_1.testMethod)(this, "register", params);
        },
        setAttribute: async (params) => {
            return (0, web3_1.testMethod)(this, "setAttribute", params);
        },
        revokeAttribute: async (params) => {
            return (0, web3_1.testMethod)(this, "revokeAttribute", params);
        },
    };
}
exports.DIDRegistrar = new Factory(web3_1.Contract.fromJson(DIDRegistrar_ral_json_1.default, "", "121b19a2b6ed634c07030dbcd011515f10ac7b6c349248a713b330572e775428"));
class DIDRegistrarInstance extends web3_1.ContractInstance {
    constructor(address) {
        super(address);
    }
    async fetchState() {
        return (0, web3_1.fetchContractState)(exports.DIDRegistrar, this);
    }
    async getContractEventsCurrentCount() {
        return (0, web3_1.getContractEventsCurrentCount)(this.address);
    }
    subscribeDIDRegisteredEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.DIDRegistrar.contract, this, options, "DIDRegistered", fromCount);
    }
}
exports.DIDRegistrarInstance = DIDRegistrarInstance;
//# sourceMappingURL=DIDRegistrar.js.map