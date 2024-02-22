import {ProfileOptions} from "../cards/types.js";
import {cardService} from "../cards/cardService.js";
import fs from "fs";
import {resolve} from "path";
import child_process from "child_process";
import {starfishAPi} from "@starfish/artifacts";
import {pinService} from "../cards/pinService.js";

let lastResult: string = null;

export async function generateCard({name, title}: ProfileOptions) {
  const {did} = starfishAPi.getDIDAccount();
  const htmlObj = cardService.renderCard({
    name,
    did,
    timestamp: Date.now(),
    qrCodeLink: 'Hello',
    title,
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
  }, {width: 420, height: 420})

  fs.writeFileSync(resolve('./test.html'), htmlObj.html);

  lastResult = Buffer.from(JSON.stringify(htmlObj.widget)).toString('base64');

  // console.log('Preview here: file:///'+resolve('./test.html'))
  // console.log('launching preview... file:///'+resolve('./test.html'));

}

export async function pushContentToIpfs() {
  return pinService.pinContentToIPFS(lastResult);
}

export async function previewCard() {
  child_process.spawn('open', [resolve('./test.html')]);
}

//file:///Users/ffox/Projects/Cocabana/starfish/packages/demo-cli/test.html