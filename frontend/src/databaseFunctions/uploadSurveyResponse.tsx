import { SDKState } from "@metamask/sdk-react";
import { ResponseTableSchema, Survey } from "../types";
import { addFile } from "./IPFSfunctions";
import { getPublicKey, getTablelandDB } from "./createSurvey";
import { decryptAES, encrypt, encryptAES, decrypt } from "./cryptoFunctions";
import { IExecDataProtectorCore } from '@iexec/dataprotector';

const web3Provider = window.ethereum;
// Instantiate only the Core module
const dataProtectorCore = new IExecDataProtectorCore(web3Provider);

export const responseTableName = 'RESPONSES_31337_3'
export default async function uploadSurveyResponse(data: string, survey: Survey, metamask: SDKState) {
  console.log(new Date().getTime())
  if (!metamask.account) {
    throw Error('No account is connected')
  };

  const fileName = survey.title + '_' + metamask.account;

  const {keystring, encryptedData} = await encryptAES(data);
  
  const researcherKeystring = encrypt(survey.encryptionKey as string, keystring);
  const userKeystring = encrypt(await getPublicKey(metamask.account as string, metamask.provider), keystring);
  
  // console.log(researcherKeystring, userKeystring, encryptedData)
  // console.log(await decrypt(userKeystring, metamask.account, metamask))

  const responseData = data;
  // upload file to iexe
  const protectedData = await dataProtectorCore.protectData({
    name: survey.title,
    data: {responseData},
  });
  
  // add to tableland table
  const params: ResponseTableSchema = {
      responseAddress: protectedData.address,
      userID: metamask.account || '',
      surveyID: survey.id || 0,
  };
  const paramList = [params.responseAddress, params.userID, params.surveyID];
  const paramString = paramList.join(', ');
  const query = 'INSERT INTO ' + responseTableName + ' VALUES (' + paramString + ');';
  console.log(query)
  console.log(new Date().getTime())
  const db = await getTablelandDB(metamask);
  const { meta: insert } = await db.prepare(query).run();

  const result = await insert.txn?.wait();
  console.log(result);
  console.log(new Date().getTime())

}