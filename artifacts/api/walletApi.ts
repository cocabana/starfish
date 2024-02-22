import {PrivateKeyWallet} from "@alephium/web3-wallet";
import {web3} from "@alephium/web3";
import {demoAccounts} from "./demoAccounts";


/*
1.- Private key accounts; generate 4, hard-code sKey
2. Use CLI to create subcontract, create profile, set attribute
3. Use Website to read attribute, fetch IPFS data, render profile
4. Deploy to Testnet, get faucet tokens
 */

///http://127.0.0.1:22973/addresses/1iaRFCwwYK8XAixrtq56w7PwkVrCR6Bo16nW9LQYaqkA/balance
// http://35.226.96.92:22973/addresses/1DrDyTr9RpRsQnDnXo2YRiPzPW4ooHX5LLoqXrqfMrpQH/balance

class WalletApi {

  private isInitialized = false;

  constructor() {

  }

  async initialize() {
    if (!this.isInitialized) {
      //this.wallet = new NodeWallet('alephium-web3-test-only-wallet', web3.getCurrentNodeProvider());
      // this.wallet = await testNodeWallet();
      this.isInitialized = true;
      // this.signers = demoAccounts.map(a => new PrivateKeyWallet({privateKey: a.privateKey, nodeProvider:web3.getCurrentNodeProvider()}));
    }
  }

  getSignerByAddress(address: string) {
    const account = demoAccounts.find(s => s.address === address);
    return account ? new PrivateKeyWallet({privateKey: account.privateKey, nodeProvider:web3.getCurrentNodeProvider()}) : null;
  }

}

export const walletApi = new WalletApi();