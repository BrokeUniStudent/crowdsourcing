export interface SurveyProps {
    survey: {
        date: string;
        description: string;
        image: string;
        imageLabel: string;
        title: string;
    };
}

export type Survey = {
    date: string;
    description: string;
    image: string;
    imageLabel: string;
    title: string;
}

export enum SurveyQuestionTypes {
    text = 'text',
    scale = 'scale',
    selection = 'selection',
}

export type SelectParams = {
    question: string;
    selections: string[];
    minSelections: number;
    maxSelections: number;
}

export type TextParams = {
    question: string;
    maxWordCount: number;
}

export type ScaleParams = {
    question: string;
    labels: string[];
}

export type FormParams = [SurveyQuestionTypes, SelectParams | TextParams | ScaleParams, boolean?]

// export default function getFormParamsType(formParams: FormParams){
//     if (formParams.selections) {
//         return SurveyQuestionTypes.selection;
//     }
//     if (formParams.labels) {
//         return SurveyQuestionTypes.scale;
//     }
//     if (formParams.maxWordCount) {
//         return SurveyQuestionTypes.text;
//     }
// }

export enum Role{
    researcher= 'researcher',
    participant = 'participant',
    reviewer= 'reviewer'
}

export type Auth = {
    role: Role | undefined,
    id: string,
    key?: string
}