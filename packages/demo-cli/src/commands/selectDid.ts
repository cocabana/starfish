import {starfishAPi, starfishWrite} from "@starfish/artifacts";


export async function selectDid({index}: {index: number}) {
  const {address} = await starfishAPi.selectDidAccount(index - 1);
  const balance = await starfishAPi.getAccountBalance(address);
  if (balance === '0 ALPH') {
    throw new Error('Account has no balance - ' + address);
  }
  console.log('Balance', address, balance);
  await starfishWrite.createContractAccount(address);
}