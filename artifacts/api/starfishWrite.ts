
import {ONE_ALPH, stringToHex, web3} from "@alephium/web3";
import {stringToU256} from "./utils";
import {starfishAPi, walletApi} from "./";
import {Register, SetAttribute} from "../ts";

class StarfishWrite {

  async createContractAccount(identity: string) {

    if (await starfishAPi.hasContractAccount(starfishAPi.resolveSubContractAddress(identity)))
    {
      console.log('Contract account already exists');
      return;
    }

    console.log('Create new record subcontract account for', identity);

    const result = await Register.execute(walletApi.getSignerByAddress(identity), {
      initialFields: {
        registrar: starfishAPi.getDidRegistrarContractId(),
        identity
      },
      attoAlphAmount: ONE_ALPH
    });

    console.log(`Register txid: ${result.txId}`);

    const contractEvents = await web3.getCurrentNodeProvider().events.getEventsTxIdTxid(result.txId);

    contractEvents.events.forEach(e => console.log('Event', e));

  }

  async setContractAttribute(identity: string, name: string, value: string) {
    const result = await SetAttribute.execute(walletApi.getSignerByAddress(identity), {
      initialFields: {
        registrar: starfishAPi.getDidRegistrarContractId(),
        identity,
        name: stringToU256(`did/svc/${name}`),
        validity: 31536000n,
        value: stringToHex(value)
      }
    });
    console.log(`SetAttribute txid: ${result.txId}`);

    const contractEvents = await web3.getCurrentNodeProvider().events.getEventsTxIdTxid(result.txId);

    contractEvents.events.forEach(e => console.log('Event', e));
  }
}

export const starfishWrite = new StarfishWrite();