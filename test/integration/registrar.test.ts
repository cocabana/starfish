import {prepareForTests, stringToU256} from "../utils";
import {getSigners, testNodeWallet} from "@alephium/web3-test";
import {
  Account,
  bs58,
  Contract, encodeByteVec,
  encodeContractField,
  isBase58,
  ONE_ALPH,
  stringToHex,
  subContractId, toApiAddress,
  web3
} from "@alephium/web3";
import {loadDeployments} from "../../artifacts/ts/deployments";
import {DIDRecord, DIDRecordTypes, DIDRegistrar, Register, SetAttribute} from "../../artifacts/ts";
import {addressFromContractId, binToHex} from "@alephium/web3";
import {NodeWallet} from "@alephium/web3-wallet";

describe("end-to-end", () => {

  let account: Account;
  let signer: NodeWallet;

  beforeAll(async () => {
    await prepareForTests();
    signer = await testNodeWallet();
    account = await signer.getSelectedAccount();
  });

  it("should register identity", async () => {

    const deploys = loadDeployments("devnet");
    const {contractId: registrar, address } = deploys.contracts.DIDRegistrar.contractInstance;

    // const state = await DIDRegistrar.at(address).fetchState();
    //
    // console.log('state', state);

    // const testId = subContractId(registrar, blake2bHex(encodeContractField('Address', account.address)[0]), account.group);
    const aToB = binToHex(bs58.decode(account.address));
    const recordId = subContractId(registrar, aToB, account.group);
    const recordAddress = addressFromContractId(recordId);//'xFs9dBUeMPV6hpHCRv78JDXRKLX92JPk1ARBwdvizUjR';//addressFromContractId(recordId);

    console.log('recordId', recordId, 'recordAddress', recordAddress, 'identity', account.address);
    console.log('addressToBytesVec', aToB);
    console.log('registrarId', registrar);

    try {
      const state = await DIDRecord.at(recordAddress).fetchState();

      console.log('state', state);
    }
    catch (e) {

      const result = await Register.execute(signer, {
        initialFields: {
          registrar,
          identity: account.address,
        },
        attoAlphAmount: ONE_ALPH
      });

      console.log(`Register on DIDRegistrar txid: ${result.txId}`);
    }
  });

  it("should create, setAttribute", async () => {

    // const signer = await testNodeWallet();
    // const account = await signer.getSelectedAccount();
    // const accounts = await signer.getAccounts();
    // const account = accounts[0];
    const deploys = loadDeployments("devnet");
    const registrar = deploys.contracts.DIDRegistrar.contractInstance.contractId;

    console.log('address', account.address);

    const result = await SetAttribute.execute(signer, {
      initialFields: {
        registrar,
        identity: account.address,
        name: stringToU256("did/svc/test1"),
        validity: 31536000n,
        value: stringToHex("value1")
      }
    });

    console.log(`SetAttribute on DIDRecord txid: ${result.txId}`);
    const node = web3.getCurrentNodeProvider();
    const events = await node.events.getEventsTxIdTxid(result.txId);
    const event = events.events.find(
      (e) => {
        console.log('Event', e);
        return e.eventIndex === DIDRecord.eventIndex.DIDAttributeChanged;
      }
    );

    const parsedEvent = Contract.fromApiEvent(
      event,
      DIDRecord.contract.codeHash,
      result.txId
    ) as DIDRecordTypes.DIDAttributeChangedEvent;

    console.log('parsedEvent', parsedEvent, 'address', account.address);

    // const state = await DIDRecord.at(account.address).fetchState();
    // console.log('state', state);

  })
});

