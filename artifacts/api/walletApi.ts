import {PrivateKeyWallet} from "@alephium/web3-wallet";
import {demoAccounts} from "./demoAccounts";
import {getSigners} from "@alephium/web3-test";
import {web3, hashMessage} from "@alephium/web3";
import {getNodeProviderUrl} from "./utils";
import {LocalStorage} from 'node-localstorage';
import fs from "fs";
import {resolve} from "path";
import {credentialBuilder} from "./credentialBuilder";


///http://127.0.0.1:22973/addresses/1iaRFCwwYK8XAixrtq56w7PwkVrCR6Bo16nW9LQYaqkA/balance
//https://backend.mainnet.alephium.org/infos

class WalletApi {

  private signers: PrivateKeyWallet[] = [];

  public async prepareAccounts(keys?: string[]) {

    const nodeProvider = web3.getCurrentNodeProvider();

    if (keys && keys.length > 0) {
      this.signers = keys.map(k => new PrivateKeyWallet({privateKey: k, nodeProvider}));
      demoAccounts.setAccounts(this.signers.map(s => s.address));
      await this.syncAccountsToWebsiteProject();
      return;
    }

    const localStorage = new LocalStorage('./scratch');

    const keyItem = localStorage.getItem('alephiumDemoAccounts');
    if (keyItem) {
      const keys = keyItem.split(',');
      this.signers = keys.map(k => new PrivateKeyWallet({privateKey: k, nodeProvider}));
      demoAccounts.setAccounts(this.signers.map(s => s.address));
    }


    const accounts = demoAccounts.getAccounts();
    const demoBalance = await nodeProvider.addresses.getAddressesAddressBalance(accounts[0]);

    if (demoBalance.balance !== '0') {
      console.log('Demo accounts have already been funded')
      await this.syncAccountsToWebsiteProject();
      return;
    }

    if (getNodeProviderUrl().startsWith('http://127.0.0.1')) {
      //TODO - create 4 new random accounts and save keys to localstorage
      this.signers = await getSigners(4);
      demoAccounts.setAccounts(this.signers.map(s => s.address));
      localStorage.setItem('alephiumDemoAccounts', this.signers.map(s => s.privateKey).join(','));
      await this.syncAccountsToWebsiteProject();

      console.log('Create and funded 4 new random accounts')
    }
    else {
      throw new Error('No keys provided and no local node to generate keys')
    }
  }

  async syncAccountsToWebsiteProject() {
    let dirname: string;
    try {
      //CommonJS
      dirname = __dirname;
    }
    catch (e) {
      //ESM

      // @ts-ignore
      const path = await import('node:path');
      // @ts-ignore
      const {fileURLToPath} = await import('node:url');
      // @ts-ignore
      const filename = fileURLToPath(import.meta.url);

      dirname = path.dirname(filename);
    }
    const targetFile = resolve(dirname, '../../../../packages/demo-website/src/accounts.json');
    //console.log('syncWebsiteAccounts', dirname, targetFile);
    fs.writeFileSync(targetFile, JSON.stringify(demoAccounts.getAccounts(), null, 2));
  }

  getSignerByAddress(address: string) {
    return this.signers.find(s => s.address === address);
  }

  generateCredential(address: string, subject: any): Promise<string> {
    const issuerWallet = this.signers[0];
    const issuer = `did:alph:${issuerWallet.address}`;
    const receiver = `did:alph:${address}`;

    return credentialBuilder.createVerifiableCredential(issuer, issuerWallet.privateKey, { id: receiver, ...subject}).then(vc => vc.proof.jwt);
  }

  signCredential(payload: string, address: string) {
    return this.getSignerByAddress(address).signRaw(address, hashMessage(payload, 'sha256'));
  }

}

export const walletApi = new WalletApi();