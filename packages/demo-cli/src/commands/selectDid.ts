import {starfishAPi, starfishWrite} from "@starfish/artifacts";


export async function selectDidByAddress(address: string) {
  await starfishAPi.selectDidAccount(address);
  const balance = await starfishAPi.getAccountBalance(address);
  if (balance === '0 ALPH') {
    throw new Error('Account has no balance - ' + address);
  }
  //console.log('Balance', address, balance);
  await starfishWrite.createContractAccount(address);
}