import axios from 'axios';
import bcrypt from 'bcryptjs'
import { RESEARCHER_ID, exampleForm, mockFilebase } from "../mockFilebase/mockIPFS";
import { FormParams, SurveyProps } from '../types';
import { IPFS_GATEWAY_TOKEN, IPFS_GATEWAY_URL, JWT } from '../PRIVATE_CONSTANTS';
import { createHelia } from 'helia'
import { strings } from '@helia/strings'
import { CID } from 'multiformats/cid'
import { concat } from 'lodash';
import { unixfs } from '@helia/unixfs';



export const GLOSSARY_BUCKET = 'Glossary';

// export async function addFile(fileName: string, content: any) {
//     fileName = fileName + '.csv';

//     content = JSON.stringify(content);

//     const file = new File([content], fileName, { type: 'text/csv' })
    
//     // create a new NFTStorage client using our API key
//     try {
//         const formData = new FormData();
        
    
//         formData.append("file", file);
    
//         const request = await fetch("https://uploads.pinata.cloud/v3/files", {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${JWT}`,
//           },
//           body: formData,
//         });
//         const response = await request.json();
//         console.log(response);
//         return response.data.cid;

//     } catch (error) {
//     console.log(error);
//     }

// }

// export async function readFile(fileAddress:string): Promise<SurveyProps | undefined> {
//     try {
//         const payload = JSON.stringify({
//           url: IPFS_GATEWAY_URL + fileAddress,
//           expires: 500000, // Number of seconds
//           date: new Date().getTime(), // Current date
//           method: "GET" // GET for retrieving files
//         })
    
//         const signedUrlRequest = await fetch(
//           `https://api.pinata.cloud/v3/files/sign`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${JWT}`,
//           },
//           body: payload
//         });
//         const signedUrl = await signedUrlRequest.json();

//         const request = await fetch(signedUrl.data);
//         const contentType: string | null =
// 			request.headers.get("content-type")?.split(";")[0] || null;

//         let data;
// 		if (contentType?.includes("application/json")) {
// 			data = await request.json();
// 		} else if (contentType?.includes("text/")) {
// 			data = await request.text();
// 		} else {
// 			data = await request.blob();
// 		}

//         console.log("data", data)
//         return data as SurveyProps;
//       } catch (error) {
//         console.log("error", error);
//       }
// }
const helia = await createHelia()
const str = strings(helia)
const fs = unixfs(helia)

export async function addFile(fileName: string, content: any) {
  content = JSON.stringify(content);
  try{
    // const str = strings(await createHelia())
    const cid = await fs.addBytes(
      new TextEncoder().encode(content),
    )
    

    // const cid = await str.add(content)
    // console.log("survey data", await str.get(CID.parse(cid.toString())))
    return cid.toString()
  }catch (error) {
    console.log(error)
  }
}

export async function readFile(fileAddress:string): Promise<SurveyProps | undefined> {
  try {
    if (fileAddress === undefined) {
      return undefined;
    }
    // const str = strings(await createHelia())

    let data = "data";
    for await (const chunk of fs.cat(CID.parse(fileAddress))) {
      data += new TextDecoder().decode(chunk, {
        stream: true   
      })
    }
    console.log(data)
    // const data = await str.get(CID.parse(fileAddress))
 
    return data as unknown as SurveyProps;
    } catch (error) {
      console.log("error", error);
    }
}

export async function hashResearcherID(researcherID?: string){
    return bcrypt.hashSync(researcherID || RESEARCHER_ID).slice(50)
}
