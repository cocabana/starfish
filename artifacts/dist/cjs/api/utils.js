"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeProviderUrl = exports.setNodeProviderUrl = exports.addressToByteVec = exports.printEvents = exports.u256ToString = exports.stringToHex = exports.stringToU256 = void 0;
const web3_1 = require("@alephium/web3");
let nodeProviderUrl = '';
function stringToU256(str) {
    const buffStr = '0x' + Buffer.from(str).slice(0, 32).toString('hex');
    return BigInt(buffStr + '0'.repeat(66 - buffStr.length));
}
exports.stringToU256 = stringToU256;
function stringToHex(str) {
    return '0x' + Buffer.from(str, 'utf-8').toString('hex');
}
exports.stringToHex = stringToHex;
function u256ToString(input) {
    if (typeof input === 'string')
        input = BigInt(input);
    const buff = Buffer.from(input.toString(16), 'hex');
    return buff.toString('utf8').replace(/\0+$/, '');
}
exports.u256ToString = u256ToString;
async function printEvents(txId) {
    const node = web3_1.web3.getCurrentNodeProvider();
    const events = await node.events.getEventsTxIdTxid(txId);
    events.events.forEach(e => console.log('Event', e));
}
exports.printEvents = printEvents;
function addressToByteVec(address) {
    return (0, web3_1.binToHex)(web3_1.bs58.decode(address));
}
exports.addressToByteVec = addressToByteVec;
function setNodeProviderUrl(url) {
    nodeProviderUrl = url;
    web3_1.web3.setCurrentNodeProvider(url);
}
exports.setNodeProviderUrl = setNodeProviderUrl;
function getNodeProviderUrl() {
    return nodeProviderUrl;
}
exports.getNodeProviderUrl = getNodeProviderUrl;
//# sourceMappingURL=utils.js.map