import {prepareForTests, stringToU256} from "../utils";
import {testNodeWallet} from "@alephium/web3-test";
import {Contract, ONE_ALPH, stringToHex, web3} from "@alephium/web3";
import {loadDeployments} from "../../artifacts/ts/deployments";
import {DIDRecord, DIDRecordTypes, SetAttribute} from "../../artifacts/ts";

describe("end-to-end DIDRegistrar", () => {

  beforeAll(async () => {
    await prepareForTests();
  });

  it("should create, setAttribute", async () => {

    const signer = await testNodeWallet();
    const account = await signer.getSelectedAccount();
    const deploys = loadDeployments("devnet");
    const registrar = deploys.contracts.DIDRegistrar.contractInstance.contractId;

    console.log('address', account.address);

    const result = await SetAttribute.execute(signer, {
      initialFields: {
        registrar,
        identity: account.address,
        name: stringToU256("did/svc/test"),
        validity: 31536000n,
        value: stringToHex("value1")
      },
      attoAlphAmount: ONE_ALPH
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

    console.log('parsedEvent', parsedEvent);
  })
});