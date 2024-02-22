import * as dotenv from "dotenv"
dotenv.config({path: './.env'});
dotenv.config({path: './.env.local', override: true});
import {starfishAPi} from "@starfish/artifacts";

if (process.env.NODE_PROVIDER_URL){
  console.log('Setting node provider to', process.env.NODE_PROVIDER_URL);
  starfishAPi.setCurrentNodeProvider(process.env.NODE_PROVIDER_URL);
}