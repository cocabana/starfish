import { select } from '@inquirer/prompts';
import {walletApi} from "../wallet/wallet-api";

export const mainPrompt = async() => {

  const loop = async() => {

    console.log('');

    let arg = await select({
      message: 'What would like to do?',
      choices: [
        {name: 'List Accounts', value: 'listAccounts'},
        {name: 'List Balances', value: 'listBalances'},
        {name: 'exit', value: 'exit'}
      ]
    })

    //const arg = responses.action;

    if (arg === 'listAccounts') {
      await walletApi.listWalletAccounts();
    } else if (arg === 'listBalances') {
      await walletApi.listAccountBalances();
    } else if (arg === 'exit') {
      process.exit(0);
    } else if (arg === 'decrypt') {
      console.log('decrypt');
      // await promptWalletDecrypt.prompt();
    }

    loop();
  }

  loop();
}
