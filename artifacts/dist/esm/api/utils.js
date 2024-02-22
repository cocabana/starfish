import { binToHex, bs58, web3 } from "@alephium/web3";
let nodeProviderUrl = '';
export function stringToU256(str) {
    const buffStr = '0x' + Buffer.from(str).slice(0, 32).toString('hex');
    return BigInt(buffStr + '0'.repeat(66 - buffStr.length));
}
export function stringToHex(str) {
    return '0x' + Buffer.from(str, 'utf-8').toString('hex');
}
export function u256ToString(input) {
    if (typeof input === 'string')
        input = BigInt(input);
    // console.log('u256ToString', input, input.toString(16));
    const buff = Buffer.from(input.toString(16), 'hex');
    return buff.toString('utf8').replace(/\0+$/, '');
}
export async function printEvents(txId) {
    const node = web3.getCurrentNodeProvider();
    const events = await node.events.getEventsTxIdTxid(txId);
    events.events.forEach(e => console.log('Event', e));
}
export function addressToByteVec(address) {
    return binToHex(bs58.decode(address));
}
export function setNodeProviderUrl(url) {
    nodeProviderUrl = url;
    web3.setCurrentNodeProvider(url);
}
export function getNodeProviderUrl() {
    return nodeProviderUrl;
}
//# sourceMappingURL=utils.js.map