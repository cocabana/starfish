
import {ONE_ALPH, stringToHex, web3} from "@alephium/web3";
import {getNodeProviderUrl, stringToU256} from "./utils";
import {starfishAPi, walletApi} from "./";
import {DIDRecord, Register, SetAttribute} from "../ts";

class StarfishWrite {

  async createContractAccount(identity: string) {

    if (await starfishAPi.hasContractAccount(starfishAPi.resolveSubContractAddress(identity)))
    {
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

    if (getNodeProviderUrl().includes('mainnet')) {
      console.log(`Sent SetAttribute tx: https://explorer.alephium.org/transactions/${result.txId}`);
    }
    else if (getNodeProviderUrl().includes('testnet')) {
      console.log(`Sent SetAttribute tx: https://testnet.alephium.org/transactions/${result.txId}`);
    }
    else {
      console.log(`SetAttribute txid: ${result.txId}`);
    }

    // const contractEvents = await web3.getCurrentNodeProvider().events.getEventsTxIdTxid(result.txId);
    // const event = contractEvents.events.find(e => e.eventIndex === DIDRecord.eventIndex.DIDAttributeChanged);
    //
    // contractEvents.events.find(e => console.log('Event', e));
    //
    // if (event) {
    //   console.log('Success');
    // }
    // else {
    //   throw new Error('Failed to update contract state');
    // }
  }
}

export const starfishWrite = new StarfishWrite();