"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractByCodeHash = void 0;
const _1 = require(".");
let contracts = undefined;
function getContractByCodeHash(codeHash) {
    if (contracts === undefined) {
        contracts = [_1.DIDRecord, _1.DIDRegistrar];
    }
    const c = contracts.find((c) => c.contract.codeHash === codeHash || c.contract.codeHashDebug === codeHash);
    if (c === undefined) {
        throw new Error("Unknown code with code hash: " + codeHash);
    }
    return c.contract;
}
exports.getContractByCodeHash = getContractByCodeHash;
//# sourceMappingURL=contracts.js.map