import { Survey, SurveyProps } from "../types";
import bcrypt from 'bcryptjs';
import { FormParams, SurveyQuestionTypes } from "../types";

const defaultSurveyList: Survey[] = [
    {
        title: 'A survey for LLMA/ERA usage',
        date: '11/11/2023',
        description:
            'What are your views on LLMA/ERA?',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
    {
        title: 'How can we improve the current national healthcare system?',
        date: '10/12/2023',
        description:
            'We want to hear your views!',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
];

export const exampleForm: FormParams[] = [
    [
        SurveyQuestionTypes.scale,
        {
            question: 'How important is dress code in your choice of employer?',
            labels: ['very important', 'important', 'neutral', 'unimportant', 'very unimportant']
        }
    ],
    [
        SurveyQuestionTypes.selection,
        {
            question: 'Which of these have you visited in the last month (tick all that apply)',
            selections: ['Cinema', 'Restaurant', 'Leisure centre', 'Gallery', 'Concert venue'],
            minSelections: 0,
            maxSelections: 5
        }
    ],
    [
        SurveyQuestionTypes.text,
        {
            question: 'What matters most to you in the workplace?',
            maxWordCount: 500
        }
    ]
]

const data: SurveyProps = {
    survey: defaultSurveyList[0],
    formParams: exampleForm,
}

export const RESEARCHER_ID = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
export const PARTICIPANT_ID = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
export const mockFilebase = {
    Glossary: {'./../mockFilebase/Glossary/A survey for LLMA/ERA usage.csv': JSON.stringify(data)},
   'A survey for LLMA/ERA usage': {
        
   },
}