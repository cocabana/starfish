import {Project, web3} from "@alephium/web3";

export async function prepareForTests() {
  web3.setCurrentNodeProvider("http://127.0.0.1:22973");
  await Project.build();
}

export function stringToU256(str: string) {
  const buffStr = '0x' + Buffer.from(str).slice(0, 32).toString('hex')
  return BigInt(buffStr + '0'.repeat(66 - buffStr.length));
}

export function stringToHex (str: string)  {
  return '0x' + Buffer.from(str, 'utf-8').toString('hex')
}

export function u256ToString(input: BigInt): string {
  const buff: Buffer =  Buffer.from(input.toString(16), 'hex');
  return buff.toString('utf8').replace(/\0+$/, '')
}

export async function printEvents(txId: string) {
  const node = web3.getCurrentNodeProvider();
  const events = await node.events.getEventsTxIdTxid(txId);
  events.events.forEach(e => console.log('Event', e));
}