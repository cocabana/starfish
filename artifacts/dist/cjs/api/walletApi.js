"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletApi = void 0;
const web3_wallet_1 = require("@alephium/web3-wallet");
const demoAccounts_1 = require("./demoAccounts");
const web3_test_1 = require("@alephium/web3-test");
const web3_1 = require("@alephium/web3");
const utils_1 = require("./utils");
const node_localstorage_1 = require("node-localstorage");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
class WalletApi {
    signers = [];
    async prepareAccounts(keys) {
        const nodeProvider = web3_1.web3.getCurrentNodeProvider();
        if (keys && keys.length > 0) {
            this.signers = keys.map(k => new web3_wallet_1.PrivateKeyWallet({ privateKey: k, nodeProvider }));
            demoAccounts_1.demoAccounts.setAccounts(this.signers.map(s => s.address));
            await this.syncAccountsToWebsiteProject();
            return;
        }
        const localStorage = new node_localstorage_1.LocalStorage('./scratch');
        const keyItem = localStorage.getItem('alephiumDemoAccounts');
        if (keyItem) {
            const keys = keyItem.split(',');
            this.signers = keys.map(k => new web3_wallet_1.PrivateKeyWallet({ privateKey: k, nodeProvider }));
            demoAccounts_1.demoAccounts.setAccounts(this.signers.map(s => s.address));
        }
        const accounts = demoAccounts_1.demoAccounts.getAccounts();
        const demoBalance = await nodeProvider.addresses.getAddressesAddressBalance(accounts[0]);
        if (demoBalance.balance !== '0') {
            console.log('Demo accounts have already been funded');
            await this.syncAccountsToWebsiteProject();
            return;
        }
        if ((0, utils_1.getNodeProviderUrl)().startsWith('http://127.0.0.1')) {
            this.signers = await (0, web3_test_1.getSigners)(4);
            demoAccounts_1.demoAccounts.setAccounts(this.signers.map(s => s.address));
            localStorage.setItem('alephiumDemoAccounts', this.signers.map(s => s.privateKey).join(','));
            await this.syncAccountsToWebsiteProject();
            console.log('Create and funded 4 new random accounts');
        }
        else {
            throw new Error('No keys provided and no local node to generate keys');
        }
    }
    async syncAccountsToWebsiteProject() {
        let dirname;
        try {
            dirname = __dirname;
        }
        catch (e) {
            const path = await Promise.resolve().then(() => __importStar(require('node:path')));
            const { fileURLToPath } = await Promise.resolve().then(() => __importStar(require('node:url')));
            const filename = fileURLToPath(import.meta.url);
            dirname = path.dirname(filename);
        }
        const targetFile = (0, path_1.resolve)(dirname, '../../../../packages/demo-website/src/accounts.json');
        fs_1.default.writeFileSync(targetFile, JSON.stringify(demoAccounts_1.demoAccounts.getAccounts(), null, 2));
    }
    getSignerByAddress(address) {
        return this.signers.find(s => s.address === address);
    }
}
exports.walletApi = new WalletApi();
//# sourceMappingURL=walletApi.js.map