import './appenv.js'
import {cardService} from "./cards/cardService.js";
import * as fs from "fs";
import {resolve} from "path";
import * as child_process from "child_process";
import {getSigners} from "@alephium/web3-test";
import {starfishAPi} from "@starfish/artifacts";

export async function testCard() {
  const cardObj = cardService.renderCard({
    name: 'Barry Willis',
    did: 'did:example:123',
    timestamp: Date.now(),
    qrCodeLink: 'Hello',
    title: 'Software Engineer',
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
  }, {width: 420, height: 420})

  fs.writeFileSync(resolve('./test.html'), cardObj.html);

  child_process.spawn('open', [resolve('./test.html')]);

}

export async function testContract() {
  starfishAPi.getContractState('zAij9XsqQtfukNhVTNU8kAfEUj4dyWoABC29dZSkFPQs').then((state) => {
    console.log("getContractState 1:", state);
  })
  starfishAPi.getContractState('ufXFmSZ7eMYsYpjgWNghu5rPjhaBKCRSXG9uxUGUF41M').then((state) => {
    console.log("getContractState 2:", state);
  })
}

export async function testSigners() {
  const signers = await getSigners(4);
  signers.forEach((s, i) => {
    console.log(i, s.address, s.privateKey);
  })
}

export function getBalance() {
  starfishAPi.getAccountBalance('1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH').then((balance) => {
    console.log("getBalance 1:", balance);
  })
  starfishAPi.getAccountBalance('1CSbv1Fuw6dXL3SW1NbXqVVKLWajg5VCbwd9MLVznTthF').then((balance) => {
    console.log("getBalance 2:", balance);
  })
}

export async function checkAttribute() {
  const result = await starfishAPi.getDIDLinkedResource('1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH');
  console.log('result', result);
}


// testSigners();
getBalance();