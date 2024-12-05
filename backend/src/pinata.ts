import { PinataSDK } from "pinata";
import { IPFS_GATEWAY_URL, JWT } from "./PRIVATE_CONSTANTS";
import { unixfs } from '@helia/unixfs'
import { createHeliaHTTP } from "@helia/http";
import { CID } from 'multiformats/cid'



const pinata = new PinataSDK({
  pinataJwt: JWT,
  pinataGateway: IPFS_GATEWAY_URL,
});

export async function putCIDHelia(data: string) {
    const helia = await createHeliaHTTP()

    const fs = unixfs(helia)

    // create an empty dir and a file, then add the file to the dir
    const fileCid = await fs.addBytes(new TextEncoder().encode(data))

    const res = fs.cat(fileCid)
    console.log(res)
    return res
}


export async function getFromCID(CID: string) {
    console.log(CID)
    // try{
    //     const resp = await pinata.gateways.get(CID);
    //     // const { data, contentType } = await pinata.gateways.get(CID);
    //     console.log(resp)
    //     // return(data);

        

    // } catch (error) {
    //     console.log(error)
    // }

    try {
        const payload = JSON.stringify({
          url: IPFS_GATEWAY_URL + CID,
          expires: 500000, // Number of seconds
          date: new Date().getTime(), // Current date
          method: "GET" // GET for retrieving files
        })
    
        const signedUrlRequest = await fetch(
          `https://api.pinata.cloud/v3/files/sign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
          body: payload
        });
        const signedUrl = await signedUrlRequest.json();

        const request = await fetch(signedUrl.data);
        const contentType: string | null =
			request.headers.get("content-type")?.split(";")[0] || null;

        let data;
		if (contentType?.includes("application/json")) {
			data = await request.json();
		} else if (contentType?.includes("text/")) {
			data = await request.text();
		} else {
			data = await request.blob();
		}

        console.log(data)
        return data;
      } catch (error) {
        console.log("error", error);
      }
}


