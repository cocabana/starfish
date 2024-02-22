import {ProfileOptions} from "../cards/types.js";
import {cardService} from "../cards/cardService.js";
import fs from "fs";
import {resolve} from "path";
import child_process from "child_process";
import {starfishAPi} from "@starfish/artifacts";
import {pinService} from "../cards/pinService.js";

export async function generateCard({name, title}: ProfileOptions) {
  console.log('name:', name, 'title:', title);
  const {did} = await starfishAPi.getDIDAccount();
  const htmlObj = cardService.renderCard({
    name,
    did,
    timestamp: Date.now(),
    qrCodeLink: 'Hello',
    title,
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
  }, {width: 420, height: 420})

  fs.writeFileSync(resolve('./test.html'), htmlObj.html);

  const ipfsContent = Buffer.from(JSON.stringify(htmlObj.widget)).toString('base64');

  // fs.writeFileSync(resolve('./widget.txt'), ipfsContent);

  await pinService.pinContentToIPFS(ipfsContent);

  child_process.spawn('open', [resolve('./test.html')]);
}