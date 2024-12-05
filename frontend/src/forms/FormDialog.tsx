import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SumbitResponseForm from '../forms/SumbitResponseForm';
import { blue } from '@mui/material/colors';
import { Survey } from '../types';
import { useEffect, useState } from 'react';
import { FormParams, SurveyProps, SurveyQuestionTypes } from '../types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { readFile } from '../databaseFunctions/IPFSfunctions';

export default function FormDialog({ survey, open, handleClose }: { survey: Survey, open: boolean, handleClose: any }) {
    const [form, setForm] = useState<FormParams[]>();
    useEffect(() => {
        readFile(survey.questionsAddress as string).then(
            (res: SurveyProps|undefined) => res && setForm(res.formParams)
        )
    }, []);
    

    return (<Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle bgcolor={blue[700]} color={'white'} variant='h4'>
            {survey.title}
        </DialogTitle>

        <DialogContent sx={{ padding: 10 }}>
            {form ?
                <SumbitResponseForm form={form} handleClose={handleClose} survey={survey} /> :
                <Box position='fixed' top='49vh' left='49vw'><CircularProgress /></Box>}

        </DialogContent>

        
    </Dialog>)
}