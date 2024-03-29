import {select, input, Separator} from '@inquirer/prompts';

import {selectDidByAddress} from "./commands/selectDid.js";
import {setAttributeDid} from "./commands/setAttributeDid.js";
import {generateCard, previewCard, pushContentToIpfs} from "./commands/generateCard.js";
import {starfishAPi} from "@starfish/artifacts";

function demoAccountPrompt() {
  const choices = starfishAPi.getDemoAccounts().map((a) => ({value: a}));
  return select<string>({
    message: 'Select a demo account',
    choices,
  });
}

async function setAttributePrompt() {
  const answer = await input({ message: 'Enter the DID Linked Resource value (IPFS CID)' });
  await setAttributeDid(answer);
}

async function buildProfilePrompt() {
  const name = await input({ message: 'Profile fields - Enter a name to be shown on card:', validate: (value) => value.length > 0 || 'Please enter a name' });
  const bio = await input({ message: 'Profile fields - Enter a bio or tagline (optional): ' });
  const badgeList = await input({ message: 'Profile fields - Enter badge labels comma separated (optional): ' });
  const address = starfishAPi.getDIDAccount().address;
  let badges = [];
  if(badgeList) {
    badges = badgeList.split(',').map((b) => b.trim()).map((b) => ({label: b, provider: 'alephium'}));
  }
  await generateCard(address, {name, bio, badges})
  const preview = await input({ message: 'Would you like to preview? (Y/n)', validate: (value) => value === '' || value.toLowerCase() === 'y' || value.toLowerCase() === 'n' || 'Please enter y or n' });
  if(preview === '' || preview.toLowerCase() === 'y') {
    await previewCard();
  }
  const final = await input({ message: 'Would you like to (p)ublish, (e)dit or e(x)it? ', validate: (value) => value === 'p' || value === 'e' || value === 'x' || 'Please enter p, e or x' });
  if(final === 'p') {
    const cid = await pushContentToIpfs();
    console.log(`Profile card has been published to IPFS with CID: ${cid}`);
    const register = await input({ message: 'Would you like to register this CID to your DID? (Y/n)', validate: (value) =>  value === '' || value.toLowerCase() === 'y' || value.toLowerCase() === 'n' || 'Please enter y or n' });
    if(register === '' || register.toLowerCase() === 'y') {
      await setAttributeDid(cid);
      console.log(`CID ${cid} registered to ${address}`);
      console.log('You may build more cards or view your published card(s) at packages/demo-website');
    }
  }
  else if(final === 'e') {
    await buildProfilePrompt();
  }
}

async function mainPromptLoop() {
  const loopPrompt = () => {
    return select<string>({
      message: 'Select a command',
      choices: [
        {name: 'Build profile', value: 'generate', description: `Generate a new profile card for ${starfishAPi.getDIDAccount().address}`},
        {name: 'Change account', value: 'changeAccount', description: 'Select a different account'},
        {name: 'Exit', value: 'exit', description: 'Exit the program'},
      ]
  });
}

  while(1) {
    const answer = await loopPrompt();
    if (answer === 'generate') {
      await buildProfilePrompt()
    } else if (answer === 'register') {
      await setAttributePrompt();
    } else if (answer === 'changeAccount') {
      const answer = await demoAccountPrompt();
      await selectDidByAddress(answer);
    } else if (answer === 'exit') {
      process.exit(0);
    }
  }
}

export async function mainPrompt() {
  const answer = await demoAccountPrompt();
  await selectDidByAddress(answer);
  await mainPromptLoop();
}

