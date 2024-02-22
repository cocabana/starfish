import {starfishAPi, starfishWrite} from "@starfish/artifacts";


export async function selectDid({index}: {index: number}) {
  const {address} = await starfishAPi.selectDidAccount(index - 1);
  const balance = await starfishAPi.getAccountBalance(address);
  console.log('Balance', balance);
  await starfishWrite.createContractAccount(address);
}