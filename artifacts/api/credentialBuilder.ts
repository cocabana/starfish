import {bytesToHex, ES256KSigner, hexToBytes} from 'did-jwt'
import {
  createVerifiableCredentialJwt,
  normalizeCredential,
} from 'did-jwt-vc';
import {blake2b} from "blakejs";

type BadgeSubject = {
  badge: {
    label: string,
    provider: string
  }
}
class CredentialBuilder {

  async createVerifiableCredential(issuerDid: string, privateKey: string, badge: BadgeSubject) {

    const credential = {
      issuer: { id: issuerDid },
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential','BadgeCredential'],
      issuanceDate: new Date().toISOString(),
      credentialSubject: badge,
      credentialSchema: {
        id: 'https://raw.githubusercontent.com/cabanalabs/schemas/main/credentials/BadgeCredential/0.0.2.json',
        type: "JsonSchemaValidator2018",
      },
    } as any;

    const hash = blake2b(JSON.stringify(credential), null, 32);

    credential.id = bytesToHex(hash);

    const signer = (data: string | Uint8Array) => this.signES256K(privateKey, 'ES256K', data);

    const jwt = await createVerifiableCredentialJwt(
      credential,
      { did: issuerDid, signer, alg: 'ES256K' },
      { removeOriginalFields: true },
    )

    return normalizeCredential(jwt);
  }

  private async signES256K(privateKeyHex: string, alg: string | undefined, data: string | Uint8Array): Promise<string> {
    const signer = ES256KSigner(hexToBytes(privateKeyHex))
    const signature = await signer(data)
    // base64url encoded string
    return signature as string
  }
}

export const credentialBuilder = new CredentialBuilder();