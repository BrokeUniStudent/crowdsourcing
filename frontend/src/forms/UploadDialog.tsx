import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState, useContext } from 'react';
import { FormParams, Survey, SurveyProps, SurveyQuestionTypes } from '../types';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Input, Stack, TextField } from '@mui/material';
import { useSDK } from '@metamask/sdk-react';
import uploadCleanedData, { inviteReviewer } from '../databaseFunctions/uploadCleanedData';
import { getPublicKey } from '../databaseFunctions/createSurvey';

const exampleID = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
export default function UploadDialog({survey, open, handleClose }: {survey: Survey, open: boolean, handleClose: any }) {
    const metamask = useSDK();
    // why is everything in metamask empty 

    const reviewerID = useRef('');
    const reviewerEncryptionKey = useRef('');
    const content = useRef('');
    
    const file = useRef();

    
    const handleSubmit = async () => {
        // uplaod cleaned data to IPFS
        const cleanedDataCID = ''
        const info = {cleanedDataCID}
        // @ts-ignore
        const reviewerEncryptionKey = await getPublicKey(reviewerID.current.value, metamask.provider)
        // @ts-ignore
        inviteReviewer(reviewerID.current.value, info, metamask, surveyTitle); 
        // @ts-ignore
        uploadCleanedData(survey, content.current.value, reviewerEncryptionKey, metamask)

        // uploadCleanedData(survey.id, content.current.value, reviewerEncryptionKey.current.value, metamask)
        handleClose()
    }

    return (<Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <Stack spacing={1} padding={2}>
                <TextField inputRef={reviewerID} label='Reviewer ID to Invite' error={reviewerID.current.length !== exampleID.length} />
                {/* <TextField inputRef={reviewerEncryptionKey} label='Reviewer encryption key' 
                error={reviewerEncryptionKey.current.length !== 32} 
                /> */}
                <TextField inputRef={content} label='Content' error={!content.current.length} />

                <Input type='file' inputRef={file} />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
    </Dialog>)
}