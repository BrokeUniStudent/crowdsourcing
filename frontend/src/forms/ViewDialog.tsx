import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import SumbitResponseForm from '../forms/SumbitResponseForm';
import { blue } from '@mui/material/colors';
import { Survey } from '../types';
import { useEffect, useState } from 'react';
import { FormParams, SurveyProps, SurveyQuestionTypes } from '../types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import SurveyResultTable from '../tables/SurveyResultTable';

const exampleForm: FormParams[] = [
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

export default function ViewDialog({ survey, open, handleClose }: { survey: Survey, open: boolean, handleClose: any }) {


    return (<Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle bgcolor={blue[700]} color={'white'} variant='h4'>
            {survey.title}
        </DialogTitle>
        <DialogContent sx={{padding:0}}>
            <SurveyResultTable surveyTitle={survey.title} />

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>)
}