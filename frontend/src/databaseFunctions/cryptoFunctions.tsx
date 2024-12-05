import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';
import { SDKState } from '@metamask/sdk-react';
import { hexToBytes, utf8ToBytes, bytesToHex, bytesToUtf8 } from "ethereum-cryptography/utils.js";
import { randomBytes } from "tweetnacl";
import * as AES from "ethereum-cryptography/aes.js";
import { getRandomBytes, getRandomBytesSync } from 'ethereum-cryptography/random';
import { publicKey } from 'eth-crypto';

// export async function getDecryptedResponse(encryptedKey: string, encryptedData: string, metamask: SDKState) {
//   if (!metamask.account) {
//     throw Error('No account is connected')
//   };
//   const AESkey = await decrypt(encryptedKey, metamask.account, metamask);
//   const decryptedData = await decryptAES(AESkey as string, encryptedData);
//   return decryptedData;
// }
const ephemeralKeyPair: nacl.BoxKeyPair = 
  {
    publicKey: new Uint8Array([82, 75, 133, 99, 9, 104, 89, 39, 82, 22, 177, 164, 119, 94, 36, 220, 155, 109, 172, 34, 11, 22, 166, 130, 67, 109, 7, 58, 34, 173, 253, 73]), 
    secretKey: new Uint8Array([212, 226, 204, 22, 49, 115, 23, 111, 18, 195, 26, 171, 89, 130, 82, 66, 40, 205, 255, 221, 89, 192, 181, 223, 50, 110, 28, 187, 2, 49, 220, 56])
  };


export function encrypt(publicKey: string, data: string) {
  

  // assemble encryption parameters - from string to UInt8
  let pubKeyUInt8Array: Uint8Array;
  try {
    pubKeyUInt8Array = naclUtil.decodeBase64(publicKey);
  } catch (err) {
    throw new Error('Bad public key');
  }

  const msgParamsUInt8Array = naclUtil.decodeUTF8(data);
  const nonce = nacl.randomBytes(nacl.box.nonceLength);

  // encrypt
  const encryptedMessage = nacl.box(
    msgParamsUInt8Array,
    nonce,
    pubKeyUInt8Array,
    ephemeralKeyPair.secretKey,
  );

  // handle encrypted data
  // const output = {
  //   version: 'x25519-xsalsa20-poly1305',
  //   nonce: naclUtil.encodeBase64(nonce),
  //   ephemPublicKey: naclUtil.encodeBase64(ephemeralKeyPair.publicKey),
  //   ciphertext: naclUtil.encodeBase64(encryptedMessage),
  // };
  const output = 
    [naclUtil.encodeBase64(nonce),
      naclUtil.encodeBase64(ephemeralKeyPair.publicKey),
    naclUtil.encodeBase64(encryptedMessage)];
  console.log(output)
  // return encrypted msg data
  return output.join(' ');
}

export async function decrypt(encryptedData: string, recepientID: string, metamask: SDKState) {
  const encryptedDataList = encryptedData.split(' ');
  const params = {
      version: 'x25519-xsalsa20-poly1305',
      nonce: encryptedDataList[0],
      ephemPublicKey: naclUtil.encodeBase64(ephemeralKeyPair.publicKey),
      ciphertext: encryptedDataList[1],
    };

  const decryptedData = await metamask.provider?.request({
      "method": "eth_decrypt",
      "params": [
        JSON.stringify(params),
        recepientID
      ]
    })
  return decryptedData;
}

export async function encryptAES(data: string ) {

  const key = getRandomBytesSync(16);
  // const iv = randomBytes(16);
  const iv = key;
  const encryptedData = await AES.encrypt(utf8ToBytes(data), key, iv);
  // const keystring = bytesToHex(key) + ' ' + bytesToHex(iv);
  const keystring = bytesToHex(key);

  return {keystring: keystring, encryptedData: bytesToHex(encryptedData)};
}

export async function decryptAES(keystring:string, encryptedData: string): Promise<string> {
  const [key, iv] = getIVandKey(keystring);

  const originalData = await AES.decrypt(hexToBytes(encryptedData), key, iv);

  return bytesToUtf8(originalData);
}

export function getIVandKey(keystring: string): [Uint8Array, Uint8Array] {
  // let [keyString, ivString] = keystring.split(' ');

  // let key = hexToBytes(keyString)
  // let iv = hexToBytes(ivString)
  let key = hexToBytes(keystring);
  let iv = key;
  return [key, iv]
}