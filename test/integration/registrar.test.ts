import {prepareForTests, stringToU256} from "../utils";
import {testNodeWallet} from "@alephium/web3-test";
import {Contract, SignerProvider, stringToHex, web3} from "@alephium/web3";
import {loadDeployments} from "../../artifacts/ts/deployments";
import {DIDRecord, DIDRecordTypes, Register, SetAttribute} from "../../artifacts/ts";

describe("end-to-end DIDRegistrar", () => {

  beforeAll(async () => {
    await prepareForTests();
  });

  it("should register identity", async () => {

    const signer = await testNodeWallet();
    // const account = await signer.getSelectedAccount();
    const accounts = await signer.getAccounts();
    const account = accounts[0];
    const deploys = loadDeployments("devnet");
    const registrar = deploys.contracts.DIDRegistrar.contractInstance.contractId;

    const result = await Register.execute(signer, {
      initialFields: {
        registrar,
        identity: account.address,
      }
    });

    console.log(`Register on DIDRegistrar txid: ${result.txId}`);
  });

  it("should create, setAttribute", async () => {

    const signer = await testNodeWallet();
    // const account = await signer.getSelectedAccount();
    const accounts = await signer.getAccounts();
    const account = accounts[0];
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
      }
    });

    console.log(`SetAttribute on DIDRecord txid: ${result.txId}`);
    const node = web3.getCurrentNodeProvider();
    const events = await node.events.getEventsTxIdTxid(result.txId);
    const event = events.events.find(
      (e) => {
        console.log('Event', e);
        return false;
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