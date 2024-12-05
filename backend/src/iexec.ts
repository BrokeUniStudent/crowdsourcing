import { IExecDataProtector, getWeb3Provider } from '@iexec/dataprotector';

// Get Web3 provider from a private key
const web3Provider = getWeb3Provider("");

// Instantiate using the umbrella module for full functionality
const dataProtector = new IExecDataProtector(web3Provider);

const dataProtectorCore = dataProtector.core; // access to core methods
const dataProtectorSharing = dataProtector.sharing; // access to methods

export const responseTableName = 'RESPONSES_31337_3'
export default async function uploadToIEXEC(responseData: string, surveyTitle: string) {

  // upload file to iexe
  const protectedData = await dataProtectorCore.protectData({
    name: surveyTitle,
    data: {surveyTitle, responseData},
  });
  console.log(protectedData)
}