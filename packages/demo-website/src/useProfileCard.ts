import {starfishAPi} from "@starfish/artifacts";
import {useState} from "react";

const baseUrl = 'https://coffee-accused-boa-592.mypinata.cloud/ipfs';

export const useProfileCard = () => {

  const [credentials, setCredentials] = useState<string[]>([]);

  const getDemoAccounts = () => {
    return starfishAPi.getDemoAccounts();
  }

  const fetchContent = async (hash: string) => {
    const res = await fetch(`${baseUrl}/${hash}`);
    const jsonObj = await res.json();
    let encodedContent = jsonObj;
    if (typeof jsonObj === 'object') {
      if(jsonObj.credentials) {
        setCredentials(jsonObj.credentials);
      }
      if(jsonObj.content) {
        encodedContent = jsonObj.content;
      }
    }
    const contentStr = atob(encodedContent);
    const profileCardObj = JSON.parse(contentStr);

    // console.log('encodedContent', encodedContent);
    // console.log('contentStr', contentStr);
    // console.log('profileCardObj', profileCardObj);

    return profileCardObj;
  }

  const fetchProfileCard = async (safeAddress: string) => {

    const result = await starfishAPi.getDIDLinkedResource(safeAddress);

    console.log('Attribute', result);

    const isCid = result.value.startsWith('Qm');

    if (isCid) {
      return fetchContent(result.value);
    }
    else {

      return({
        stylesheet: '',
        body: result.value,
        width: 300,
        height: 150
      });
    }
  }



  return {
    getDemoAccounts,
    fetchProfileCard
  }
}