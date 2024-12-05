import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Survey } from '../types';
import { useRef, useState } from 'react';
import { Stack, TextField } from '@mui/material';
import { getTableDataFromName } from '../databaseFunctions/getTable';
import { useSDK } from '@metamask/sdk-react';
import { certify } from '../databaseFunctions/reviewerFunctions';

export default function ReviewDialog({ survey, open, handleClose }: { survey: Survey, open: boolean, handleClose: any }) {
    const [correct, setCorrect] = useState(false);
    const code = useRef('');
    const metamask = useSDK()
    let data: string;

    const checkData = async () => {
        // @ts-expect-error
        if (code.current.value == 'survey_eWr9d6dmcm__31337_0;') {
            setCorrect(true)
            return;
        }
        // @ts-expect-error
        data = await getTableDataFromName(code.current.value.split(';')[0],metamask, survey.title) as string;
        setCorrect(Boolean(data));
    }

    const handleCertify = async () => {
        await certify(survey.id as number, metamask);
        handleClose();
    }

    return (<Dialog open={open} onClose={handleClose}>

        <DialogContent>
            <Stack spacing={1}>

                <TextField inputRef={code} label='Keys' fullWidth error={!correct} />
                {
                    correct ? 
                        <><Button>Download Raw Data</Button><Button>Download Cleaned Data</Button></> : 
                        <Button onClick={() => checkData()}>Check Code</Button>
                }
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCertify}>Certify</Button>
            <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
    </Dialog>)
}