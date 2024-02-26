import {BadgeOptions, ProfileOptions} from "../cards/types.js";
import {cardService} from "../cards/cardService.js";
import fs from "fs";
import {resolve} from "path";
import child_process from "child_process";
import {starfishAPi, walletApi} from "@starfish/artifacts";
import {pinService} from "../cards/pinService.js";

let lastResult: { content:string, badges: BadgeOptions[] };

export async function generateCard(address:string, {name, bio, badges}: ProfileOptions) {
  const {did} = starfishAPi.getDIDAccount();
  const htmlObj = cardService.renderCard({
    name,
    did,
    timestamp: Date.now(),
    qrCodeLink: `https://starfish-f3983.web.app/${address}`,
    bio,
    badges,
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
  }, {width: 420, height: 420})

  fs.writeFileSync(resolve('./test.html'), htmlObj.html);

  const content = Buffer.from(JSON.stringify(htmlObj.widget)).toString('base64');

  lastResult = {content, badges};

  // console.log('Preview here: file:///'+resolve('./test.html'))
  // console.log('launching preview... file:///'+resolve('./test.html'));

}

export async function pushContentToIpfs() {
  const {address} = starfishAPi.getDIDAccount();
  const resource = {
    version: '0.0.1',
    content: lastResult.content,
  } as any;

  if (lastResult.badges) {
    const pAll = lastResult.badges.map(b => walletApi.generateCredential(address, { badge: b }));
    resource.credentials = await Promise.all(pAll);
  }
  console.log(resource);
  return pinService.pinContentToIPFS(resource);
}

export async function previewCard() {
  child_process.spawn('open', [resolve('./test.html')]);
}

//file:///Users/ffox/Projects/Cocabana/starfish/packages/demo-cli/test.html