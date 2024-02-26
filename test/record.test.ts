import {prepareForTests, stringToU256, u256ToString} from "./utils";
import {DIDRecord, DIDRegistrar} from "../artifacts/ts";
import {randomContractAddress, testAddress, testNodeWallet} from "@alephium/web3-test";

import {Address} from "@alephium/web3/src/signer/types";
import {hexToString, ONE_ALPH, stringToHex} from "@alephium/web3";

const ONE_YEAR_SECONDS = 31536000n;

describe("DIDRecord", () => {
  beforeAll(async () => {
    await prepareForTests();
  });


  it("should emit event and update changed after setAttribute", async () => {
    const signer = await testNodeWallet();
    const accounts = await signer.getAccounts();
    const owner: Address = accounts[0].address;
    const contractAddress = randomContractAddress();

    const result = await DIDRecord.tests.setAttribute({
        address: contractAddress,
        testArgs: {name: stringToU256("did/svc/test1"), validity: ONE_YEAR_SECONDS, value: stringToHex("value1")},
        initialFields: { identity: owner, owner, changed: 170795n },
        inputAssets: [{ address:testAddress, asset: { alphAmount: ONE_ALPH * 2n }}],
      });

    console.log('debugMessages', result.debugMessages);

    const event = result.events.find(
      (e) => {
        console.log(e.eventIndex, e.name, e.fields, 'name:', u256ToString(e.fields.name as any), 'value:', hexToString(e.fields.value as any));
        return e.name === 'DIDAttributeChanged';
      }
    );

    expect(event).toBeDefined();
    expect(event.fields.validTo as bigint).toBeGreaterThan(ONE_YEAR_SECONDS);

    const contract = result.contracts.find((c) => c.address === contractAddress);

    console.log('contract', contract.fields);

    expect(contract.fields.changed).toBeGreaterThan(170795n);

  })

  it("should emit event and update changed after changeOwner", async () => {
    const signer = await testNodeWallet();
    const accounts = await signer.getAccounts();
    const owner: Address = accounts[0].address;
    const contractAddress = randomContractAddress();
    const newOwner = accounts[1].address;

    const result = await DIDRecord.tests.changeOwner({
      address: contractAddress,
      testArgs: {newOwner},
      initialFields: { identity: owner, owner, changed: 170795n },
      inputAssets: [{ address:testAddress, asset: { alphAmount: ONE_ALPH * 2n }}],
    });

    console.log('debugMessages', result.debugMessages);

    const event = result.events.find(
      (e) => {
        console.log(e.eventIndex, e.name, e.fields);
        return e.name === 'DIDOwnerChanged';
      }
    );

    expect(event).toBeDefined();
  })

  it("should be able to setAttribute as newOwner", async () => {
    const signer = await testNodeWallet();
    const accounts = await signer.getAccounts();
    const oldOwner: Address = accounts[0].address;
    const newOwner: Address = accounts[1].address;
    const contractAddress = randomContractAddress();

    const result = await DIDRecord.tests.setAttribute({
      address: contractAddress,
      testArgs: {name: stringToU256("did/svc/test1"), validity: ONE_YEAR_SECONDS, value: stringToHex("value1")},
      initialFields: {identity: oldOwner, owner: newOwner, changed: 170795n},
      inputAssets: [{address: newOwner, asset: {alphAmount: ONE_ALPH * 2n}}],
    });

    console.log('debugMessages', result.debugMessages);

    const event = result.events.find(
      (e) => {
        console.log(e.eventIndex, e.name, e.fields, 'name:', u256ToString(e.fields.name as any), 'value:', hexToString(e.fields.value as any));
        return e.name === 'DIDAttributeChanged';
      }
    );

    expect(event).toBeDefined();
  })
})