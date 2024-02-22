import { ONE_ALPH, stringToHex, web3 } from "@alephium/web3";
import { stringToU256 } from "./utils";
import { starfishAPi, walletApi } from "./";
import { DIDRecord, Register, SetAttribute } from "../ts";
class StarfishWrite {
    async createContractAccount(identity) {
        if (await starfishAPi.hasContractAccount(starfishAPi.resolveSubContractAddress(identity))) {
            //console.log('Contract account already exists');
            return;
        }
        await Register.execute(walletApi.getSignerByAddress(identity), {
            initialFields: {
                registrar: starfishAPi.getDidRegistrarContractId(),
                identity
            },
            attoAlphAmount: ONE_ALPH
        });
        console.log('Created new subcontract account for', identity);
        //console.log(`Register txid: ${result.txId}`);
        // const contractEvents = await web3.getCurrentNodeProvider().events.getEventsTxIdTxid(result.txId);
        //
        // contractEvents.events.find(e => console.log('Event', e));
    }
    async setContractAttribute(identity, name, value) {
        const result = await SetAttribute.execute(walletApi.getSignerByAddress(identity), {
            initialFields: {
                registrar: starfishAPi.getDidRegistrarContractId(),
                identity,
                name: stringToU256(`did/svc/${name}`),
                validity: 31536000n,
                value: stringToHex(value)
            }
        });
        // console.log(`SetAttribute txid: ${result.txId}`);
        const contractEvents = await web3.getCurrentNodeProvider().events.getEventsTxIdTxid(result.txId);
        const event = contractEvents.events.find(e => e.eventIndex === DIDRecord.eventIndex.DIDAttributeChanged);
        if (event) {
            console.log('Success');
        }
        else {
            throw new Error('Failed to update contract state');
        }
    }
}
export const starfishWrite = new StarfishWrite();
//# sourceMappingURL=starfishWrite.js.map