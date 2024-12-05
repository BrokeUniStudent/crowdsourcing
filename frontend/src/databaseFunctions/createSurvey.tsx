import { GlossaryTableSchema, SurveyProps } from "../types";
import { Database } from "@tableland/sdk";
import { providers } from 'ethers';
import { SDKState } from "@metamask/sdk-react";
import { addFile } from "./IPFSfunctions";

export async function getPublicKey(account: string, provider: any) {
  if (!account || !provider) {
    throw Error('No account is connected');
  }
  const resp = await provider?.request({
    "method": "eth_getEncryptionPublicKey",
    "params": [
      account
    ]
  })
  return resp;
}


export const glossaryTableName = 'GLOSSARY_31337_2'
export default async function createSurvey(form: SurveyProps, metamask: SDKState){
  console.log(new Date().getTime())
  const db = await getTablelandDB(metamask);

  // upload to ipfs and get cid
  const fileAddress = await addFile(form.survey.title, form);

  // const key = await getPublicKey(metamask.account as string, metamask.provider);

  // insert into the glossary table
  const params: GlossaryTableSchema = {
    id: null,
    surveyTitle: form.survey.title,
    researcherID: metamask.account|| '',
    questionsAddress: fileAddress,
    closingDate: form.survey.date,
    cleanedDataAddress: '',
    encryptionKey: "",
    surveyDescription: form.survey.description
  }
  const paramList = Array.from(Object.values(params)).slice(1).map(attr => `'${attr}'`);
  const paramString = paramList.join(', ');
  const fields = ` (${(Array.from(Object.keys(params)).join(','))})`
  const query = 'INSERT INTO ' + glossaryTableName + fields + ' VALUES (null,' + paramString + ');'
  console.log(query)
  console.log(new Date().getTime())
  const { meta: insert } = await db.prepare(query).run();

  const result = await insert.txn?.wait();
  console.log(result);
  console.log(new Date().getTime())
}


export async function getTablelandDB(metamask: SDKState) {
  return new Database();
}