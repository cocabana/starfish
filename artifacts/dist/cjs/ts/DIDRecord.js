"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDRecordInstance = exports.DIDRecord = void 0;
const web3_1 = require("@alephium/web3");
const DIDRecord_ral_json_1 = __importDefault(require("../DIDRecord.ral.json"));
const contracts_1 = require("./contracts");
class Factory extends web3_1.ContractFactory {
    getInitialFieldsWithDefaultValues() {
        return this.contract.getInitialFieldsWithDefaultValues();
    }
    eventIndex = { DIDOwnerChanged: 0, DIDAttributeChanged: 1 };
    consts = { ErrorCodes: { InvalidCaller: BigInt(0) } };
    at(address) {
        return new DIDRecordInstance(address);
    }
    tests = {
        getOwner: async (params) => {
            return (0, web3_1.testMethod)(this, "getOwner", params);
        },
        setOwner: async (params) => {
            return (0, web3_1.testMethod)(this, "setOwner", params);
        },
        setAttribute: async (params) => {
            return (0, web3_1.testMethod)(this, "setAttribute", params);
        },
        revokeAttribute: async (params) => {
            return (0, web3_1.testMethod)(this, "revokeAttribute", params);
        },
    };
}
exports.DIDRecord = new Factory(web3_1.Contract.fromJson(DIDRecord_ral_json_1.default, "", "4661e0f51d42cb8b1fe54c0190d02eea19ce94505abf101d105823c780b38235"));
class DIDRecordInstance extends web3_1.ContractInstance {
    constructor(address) {
        super(address);
    }
    async fetchState() {
        return (0, web3_1.fetchContractState)(exports.DIDRecord, this);
    }
    async getContractEventsCurrentCount() {
        return (0, web3_1.getContractEventsCurrentCount)(this.address);
    }
    subscribeDIDOwnerChangedEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.DIDRecord.contract, this, options, "DIDOwnerChanged", fromCount);
    }
    subscribeDIDAttributeChangedEvent(options, fromCount) {
        return (0, web3_1.subscribeContractEvent)(exports.DIDRecord.contract, this, options, "DIDAttributeChanged", fromCount);
    }
    subscribeAllEvents(options, fromCount) {
        return (0, web3_1.subscribeContractEvents)(exports.DIDRecord.contract, this, options, fromCount);
    }
    methods = {
        getOwner: async (params) => {
            return (0, web3_1.callMethod)(exports.DIDRecord, this, "getOwner", params === undefined ? {} : params, contracts_1.getContractByCodeHash);
        },
    };
    async multicall(calls) {
        return (await (0, web3_1.multicallMethods)(exports.DIDRecord, this, calls, contracts_1.getContractByCodeHash));
    }
}
exports.DIDRecordInstance = DIDRecordInstance;
//# sourceMappingURL=DIDRecord.js.map