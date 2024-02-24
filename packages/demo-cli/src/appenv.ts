import * as dotenv from "dotenv"
dotenv.config({path: './.env'});
dotenv.config({path: './.env.local', override: true});
import {setNodeProviderUrl, walletApi} from "@starfish/artifacts";

if (process.env.NODE_PROVIDER_URL){
  console.log('Setting node provider to', process.env.NODE_PROVIDER_URL);
  setNodeProviderUrl(process.env.NODE_PROVIDER_URL);
  const a = process.env.DEMO_ACCOUNTS ? process.env.DEMO_ACCOUNTS.split(',') : [];
  await walletApi.prepareAccounts(a);
}