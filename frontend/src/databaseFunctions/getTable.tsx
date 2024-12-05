import bcrypt from 'bcryptjs';
import { getTablelandDB, glossaryTableName } from './createSurvey';
import { SDKState } from '@metamask/sdk-react';
import { readFile } from './IPFSfunctions';

export async function getTableName(metamask: SDKState, surveyTitle: string) {
    const hash = getTablePrefix(surveyTitle);
    const db = await getTablelandDB(metamask)
    const { results } = await db.prepare(`SELECT id FROM ${glossaryTableName} WHERE surveyTitle=='${surveyTitle}'`).all()
    console.log(results)
    const tableID = results[0].id; // look in database
    return hash + '_31337_' + tableID;
}

export async function getTableDataFromName(tableID: string, metamask: SDKState, surveyTitle: string) {
    try {
        const db = await getTablelandDB(metamask);
        const query = `SELECT * FROM ${tableID};`
        console.log(query)
        const { results } = await db.prepare(query).run()
        console.log(results)
        return results.map(result => readFile(surveyTitle)).join('\n')

    } catch (e) {
        console.log(e)
        return false
    }
}

export function getTablePrefix(surveyTitle: string) {
    return 'survey_' + bcrypt.hashSync(surveyTitle).slice(50) + '_';
}
