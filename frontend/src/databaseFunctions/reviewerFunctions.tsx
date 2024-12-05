import { SDKState } from "@metamask/sdk-react";
import { getTablelandDB, glossaryTableName } from "./createSurvey";

export async function certify(surveyID: number, metamask: SDKState){
    console.log(new Date().getTime());
    const db = await getTablelandDB(metamask);

    const query = `UPDATE ${glossaryTableName} SET reviewResult=1 WHERE id=${surveyID};`
    console.log(query)
    console.log(new Date().getTime());

    const { meta: insert } = await db.prepare(query).run();
  
    const result = await insert.txn?.wait();
    console.log(result);
    console.log(new Date().getTime());

}