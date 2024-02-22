import {prepareForTests, printEvents, stringToU256, u256ToString} from "./utils";
import {DIDRecord, DIDRegistrar} from "../artifacts/ts";
import {randomContractAddress, testAddress, testNodeWallet} from "@alephium/web3-test";

import {Address} from "@alephium/web3/src/signer/types";
import {addressFromContractId, hexToString, ONE_ALPH, stringToHex, subContractId} from "@alephium/web3";
import {addressToByteVec, createRecord, createRegistrar, defaultInitialAsset, randomAssetAddress} from "./testFixture";

const ONE_YEAR_SECONDS = 31536000n;

describe("DIDRegistrar", () => {
  beforeAll(async () => {
    await prepareForTests();
  });


  it('toByteVec', async () => {
    const signer = await testNodeWallet();
    const accounts = await signer.getAccounts();
    const owner: Address = accounts[0].address;
    const recordTemplate = DIDRecord.stateForTest(DIDRecord.getInitialFieldsWithDefaultValues());

    const result = await DIDRegistrar.tests.addressToByteVec({
      address: randomContractAddress(),
      testArgs: {address: owner},
      initialFields: { didRecordContractId: recordTemplate.contractId },
    });

    console.log('toByteVec', result.returns);
  });

  it("should emit event after DIDRegistrar.setAttribute", async () => {
    const signer = await testNodeWallet();
    const account = await signer.getSelectedAccount();
    const owner: Address = account.address;
    // const contractAddress = randomContractAddress();

    const registrarOwner = randomAssetAddress()
    const registrarFixture = createRegistrar(registrarOwner)

    const recordTemplate = DIDRecord.stateForTest(DIDRecord.getInitialFieldsWithDefaultValues());
    const recordId = subContractId(registrarFixture.contractId, addressToByteVec(owner), account.group);

    const regResult = await DIDRegistrar.tests.register({
      address: randomContractAddress(),
      testArgs: {identity: owner},
      initialFields: { didRecordContractId: recordTemplate.contractId },
      inputAssets: [{ address:testAddress, asset: { alphAmount: ONE_ALPH * 2n }}],
      existingContracts: [recordTemplate],
      });
    //
    // regResult.events.forEach(e => console.log('Event', e));

    const result = await DIDRegistrar.tests.setAttribute({
      address: registrarFixture.address,
      initialFields: registrarFixture.initialFields(),
      initialAsset: defaultInitialAsset,
        testArgs: {identity: owner, name: stringToU256("did/svc/test1"), validity: ONE_YEAR_SECONDS, value: stringToHex("value1")},
        inputAssets: [{ address:testAddress, asset: { alphAmount: ONE_ALPH * 2n }}],
        existingContracts: [createRecord(addressFromContractId(recordId), owner)],
      });

    console.log('debugMessages', result.debugMessages);

    const event = result.events.find(
      (e) => {
        console.log(e);
        return e.name === 'DIDAttributeChanged';
      }
    );

    expect(event).toBeDefined();

  })
})