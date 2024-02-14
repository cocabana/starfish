import {Args, Command, Flags} from "@oclif/core";
import {mainPrompt} from "./prompts/main";
import {walletApi} from "./wallet/wallet-api";



export default class StarfishCli extends Command {

  static description = 'Access and manage Alephium DID Registry'

  // static flags = {
  //   version: Flags.version({char: 'v'}),
  //   help: Flags.help({char: 'h'}),
  // }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(StarfishCli)

    await walletApi.initialize();

    await mainPrompt();
  }
}
