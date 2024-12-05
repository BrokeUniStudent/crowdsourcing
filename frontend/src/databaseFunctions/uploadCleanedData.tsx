import { SDKProvider } from "@metamask/sdk";
import { SDKState } from "@metamask/sdk-react";
import { getJsonWalletAddress } from "ethers/lib/utils";
import { providers } from "ethers";
import { getTableName } from "./getTable";
import { encrypt } from "./cryptoFunctions";
import { addFile } from "./IPFSfunctions";
import { Survey } from "../types";
import { getTablelandDB, glossaryTableName } from "./createSurvey";

export default async function uploadCleanedData(survey: Survey, cleanedData: string, reviewerPublicKey: string, metamask: SDKState) {
  console.log('survey', survey)
  console.log(new Date().getTime())
  const encryptContent = encrypt(reviewerPublicKey, cleanedData);
  const fileAddress = await addFile(survey.id+"_cleaned", encryptContent);
  const db = await getTablelandDB(metamask);

  const query = `UPDATE ${glossaryTableName} SET cleanedDataAddress='${fileAddress}' WHERE id=${survey.id};`
  console.log(query)
  console.log(new Date().getTime())
  const { meta: insert } = await db.prepare(query).run();
  const result = await insert.txn?.wait();
  console.log(result);
  console.log(new Date().getTime())
}

export async function inviteReviewer(reviewerID: string, info: {
    cleanedDataCID: string,
}, metamask: SDKState, surveyTitle: string) {
    const tableName = await getTableName(metamask, surveyTitle)
    if (metamask.provider) {
      const message = tableName+ ';' + info.cleanedDataCID;
      send_personal_sign(metamask.provider, reviewerID, message)
        // send_eth_signTypedData_v4(metamask.provider, '31337', reviewerID, metamask.account)
    } else {
        alert('empty provider')
    }
    // try {
    //     // For historical reasons, you must submit the message to sign in hex-encoded UTF-8.
    //     // This uses a Node.js-style buffer shim in the browser.
    //     const msg = `0x${Buffer.from(JSON.stringify(info), 'utf8').toString('hex')}`;
    //     window.ethereum?.request({
    //         method: 'personal_sign',
    //         params: [msg, from],
    //     });
    // } catch (err) {
    //     console.error(err);
    // }
}

export const send_eth_signTypedData_v4 = async (provider: SDKProvider, chainId: string, reviewerID: string, researcherID: string) => {
  const msgParams = JSON.stringify({
    domain: {
      // Defining the chain aka Rinkeby testnet or Ethereum Main Net
      chainId: chainId,
      // Give a user-friendly name to the specific contract you are signing for.
      name: 'Ether Mail',
      // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      // Just lets you know the latest version. Definitely make sure the field name is correct.
      version: '1',
    },

    message: {
      contents: 'Activation code',
      attachedMoneyInEth: 4.2,
      from: {
        name: 'Researcher',
        wallets: [
          researcherID,
        ],
      },
      to: [
        {
          name: 'Reviewer',
          wallets: [
            reviewerID,
          ],
        },
      ],
    },
    // Refers to the keys of the *types* object below.
    primaryType: 'Mail',
    types: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ],
      // Not an EIP712Domain definition
      Group: [
        { name: 'name', type: 'string' },
        { name: 'members', type: 'Person[]' },
      ],
      // Refer to PrimaryType
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person[]' },
        { name: 'contents', type: 'string' },
      ],
      // Not an EIP712Domain definition
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallets', type: 'address[]' },
      ],
    },
  });

  let from = provider?.selectedAddress;

  console.debug(`sign from: ${from}`);
  try {
    if (!from) {
      alert(
        `Invalid account -- please connect using eth_requestAccounts first`,
      );
      return;
    }

    const params = [from, msgParams];
    const method = 'eth_signTypedData_v4';
    console.debug(`ethRequest ${method}`, JSON.stringify(params, null, 4));
    console.debug(`sign params`, params);
    return await provider?.request({ method, params });
  } catch (e) {
    console.log(e);
    // @ts-expect-error
    return "Error: " + e.message;
  }
};

export const send_personal_sign = async (provider: SDKProvider, reviewerID: string, message: string) => {
  try {
    // const from = provider.selectedAddress;
    const from = reviewerID;
    const hexMessage = '0x' + Buffer.from(message, 'utf8').toString('hex');

    // @ts-ignore
    const sign = await window.ethereum.request({
      method: 'personal_sign',
      params: [hexMessage, from, 'Invitation code'],
    });
    console.log(`sign: ${sign}`);
    return sign;
  } catch (err) {
    console.log(err);
  }
};