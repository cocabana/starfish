import {starfishAPi, starfishWrite} from "@starfish/artifacts";


export async function setAttributeDid({value} : {value: string}) {
  const {address} = await starfishAPi.getDIDAccount();
  await starfishWrite.setContractAttribute(address, 'starfish-profile', value);
}