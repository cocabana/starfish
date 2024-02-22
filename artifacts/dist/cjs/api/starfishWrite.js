"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.starfishWrite = void 0;
const web3_1 = require("@alephium/web3");
const utils_1 = require("./utils");
const _1 = require("./");
const ts_1 = require("../ts");
class StarfishWrite {
    async createContractAccount(identity) {
        if (await _1.starfishAPi.hasContractAccount(_1.starfishAPi.resolveSubContractAddress(identity))) {
            return;
        }
        await ts_1.Register.execute(_1.walletApi.getSignerByAddress(identity), {
            initialFields: {
                registrar: _1.starfishAPi.getDidRegistrarContractId(),
                identity
            },
            attoAlphAmount: web3_1.ONE_ALPH
        });
        console.log('Created new subcontract account for', identity);
    }
    async setContractAttribute(identity, name, value) {
        const result = await ts_1.SetAttribute.execute(_1.walletApi.getSignerByAddress(identity), {
            initialFields: {
                registrar: _1.starfishAPi.getDidRegistrarContractId(),
                identity,
                name: (0, utils_1.stringToU256)(`did/svc/${name}`),
                validity: 31536000n,
                value: (0, web3_1.stringToHex)(value)
            }
        });
        const contractEvents = await web3_1.web3.getCurrentNodeProvider().events.getEventsTxIdTxid(result.txId);
        const event = contractEvents.events.find(e => e.eventIndex === ts_1.DIDRecord.eventIndex.DIDAttributeChanged);
        if (event) {
            console.log('Success');
        }
        else {
            throw new Error('Failed to update contract state');
        }
    }
}
exports.starfishWrite = new StarfishWrite();
//# sourceMappingURL=starfishWrite.js.map