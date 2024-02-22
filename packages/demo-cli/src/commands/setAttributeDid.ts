import {starfishAPi, starfishWrite} from "@starfish/artifacts";


export async function setAttributeDid(value: string) {
  const {address} = starfishAPi.getDIDAccount();
  await starfishWrite.setContractAttribute(address, 'starfish-profile', value);
}