import {PrivateKeyWallet} from "@alephium/web3-wallet";
import {demoAccounts} from "./demoAccounts";
import {testAddress, testPrivateKey} from "@alephium/web3-test";
import {ONE_ALPH, web3} from "@alephium/web3";
import {getNodeProviderUrl} from "./utils";

///http://127.0.0.1:22973/addresses/1iaRFCwwYK8XAixrtq56w7PwkVrCR6Bo16nW9LQYaqkA/balance
//https://backend.mainnet.alephium.org/infos

class WalletApi {

  private signers: PrivateKeyWallet[] = [];

  public async prepareAccounts(keys?: string[]) {
    if (keys && keys.length > 0) {
      this.signers = keys.map(k => new PrivateKeyWallet({privateKey: k}));
      demoAccounts.setAccounts(this.signers.map(s => s.address));
      return;
    }

    const nodeProvider = web3.getCurrentNodeProvider();
    const accounts = demoAccounts.getAccounts();
    const demoBalance = await nodeProvider.addresses.getAddressesAddressBalance(accounts[0]);

    if (demoBalance.balance !== '0') {
      console.log('Demo accounts have already been funded')
      return;
    }

    if (getNodeProviderUrl().startsWith('http://127.0.0.1')) {
      const rootWallet = new PrivateKeyWallet({ privateKey: testPrivateKey, nodeProvider })
      const alphAmount = ONE_ALPH * 100n
      const balances = await nodeProvider.addresses.getAddressesAddressBalance(testAddress)
      const availableBalance = BigInt(balances.balance) - BigInt(balances.lockedBalance)

      if (availableBalance < alphAmount) {
        throw new Error('Not enough balance, please restart the devnet')
      }

      for(let i = 0; i < accounts.length; i++) {
        const address = accounts[i];
        console.log('Funding', address);
        const destinations = [{ address, attoAlphAmount: alphAmount }]
        await rootWallet.signAndSubmitTransferTx({ signerAddress: testAddress, destinations })
      }

      console.log('Demo accounts have been funded')
    }
    else {
      throw new Error('No keys provided and no local node to generate keys')
    }
  }

  getSignerByAddress(address: string) {
    return this.signers.find(s => s.address === address);
  }

}

export const walletApi = new WalletApi();