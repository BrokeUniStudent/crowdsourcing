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

export default function FormDialog({ survey, open, handleClose }: { survey: Survey, open: boolean, handleClose: any }) {
    const [form, setForm] = useState<FormParams[]>();
    useEffect(() => {
        new Promise(resolve => {
            setTimeout(resolve, 5000);
        }).then(
            (res) => setForm(exampleForm)
        )
    }, []);

    return (<Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle bgcolor={blue[700]} color={'white'} variant='h4'>
            {survey.title}
        </DialogTitle>
        <DialogContent sx={{ padding: 10 }}>
            {form ? 
                <SumbitResponseForm form={form as FormParams[]} /> :
                <Box position='fixed' top='49vh' left='49vw'><CircularProgress /></Box>}

        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} disabled={!Boolean(form)}>Submit</Button>
        </DialogActions>
    </Dialog>)
}