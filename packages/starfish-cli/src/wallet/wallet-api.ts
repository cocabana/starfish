import {NodeWallet} from "@alephium/web3-wallet";
import {Account, web3} from "@alephium/web3";
import {testNodeWallet} from "@alephium/web3-test";

class WalletApi {

  private wallet : NodeWallet;

  constructor() {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973');
    this.wallet = new NodeWallet('alephium-web3-test-only-wallet');
  }

  async initialize() {
    await testNodeWallet();
  }

  async getAccounts() {
    const accounts = await this.wallet.getAccounts();
    return accounts.map(a => a.address);
  }

  async getAccountBalance(address: string) {
    const b = await this.wallet.nodeProvider.addresses.getAddressesAddressBalance(address);
    return b.balance;
  }

  async listWalletAccounts() {
    const accounts = await this.wallet.getAccounts();
    if (accounts.length > 1) {
      accounts.forEach((a, i) => {
        const index = (++i > 9) ? i : ' ' + i;
        console.log(`${index}. ${a.address}`)
      });
    }
    else if (accounts.length === 1) {
      console.log(accounts[0].address);
    }
    else if (accounts.length === 1) {
      console.log('No accounts found');
    }
  }

  async listAccountBalances() {
    const accounts = await this.wallet.getAccounts();
    const bAll = accounts.map((a, i) => {
      return this.getAccountBalance(a.address);
    });
    const balances = await Promise.all(bAll);
    accounts.forEach((a, i) => {
      const index = (++i > 9) ? i : ' ' + i;
      console.log(`${index}. ${a.address} ${balances[i]}`);
    });
  }
}

export const walletApi = new WalletApi();