import { SDKState } from "@metamask/sdk-react";
import { Role, Survey, SurveyProps } from "../types";
import { getTablelandDB, glossaryTableName } from "./createSurvey";

export async function listSurveys(metamask: SDKState, role: Role): Promise<Survey[]> {
    const db = await getTablelandDB(metamask);
    const baseQuery = 'SELECT id, surveyTitle, closingDate, surveyDescription, questionsAddress, encryptionKey, reviewResult FROM ' + glossaryTableName
    const suffix = role === Role.participant ? ';' : ` WHERE researcherID='${metamask.account}';`
    
    const { results } = await db.prepare(baseQuery + suffix).all();

    const surveys: Survey[] =
        results.map(({ id, surveyTitle, closingDate, surveyDescription, questionsAddress, encryptionKey, reviewResult }) =>
        ({
            id: id,
            date: closingDate,
            description: surveyDescription,
            title: surveyTitle,
            questionsAddress: questionsAddress,
            encryptionKey: encryptionKey,
            reviewResult: reviewResult
        } as Survey))
    return surveys;
}
