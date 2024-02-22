import axios from "axios";
import FormData from "form-data";

class PinService {

  constructor() {
    if (!process.env.IPFS_PIN) {
      throw new Error('IPFS_PIN env var is not set')
    }
  }

  async pinContentToIPFS (content: string) {
    const formData = new FormData();
    // const src = "path/to/file.png";

    const name = `starfish-${Date.now()/1000}.json`;

    formData.append('file', content);

    const pinataMetadata = JSON.stringify({
      name: 'Starfish Profile',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    const body = {
      "pinataContent":content,
      "pinataMetadata":{ name:name },
      "pinataOptions":{ cidVersion:0 }
    };
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${process.env.IPFS_PIN}`, 'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    };

    return fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', options)
    .then(response => response.json() as Promise<PinataResponse>)
    .then(response => response.IpfsHash);

  }
}

type PinataResponse = {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export const pinService = new PinService();