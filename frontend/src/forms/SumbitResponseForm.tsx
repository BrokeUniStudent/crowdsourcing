import { Button, Grid, Typography } from "@mui/material";
import { FormParams, Survey } from "../types";
import getSurveyComponent from "./SurveyComponents";
import { useState } from "react";
import { FormContainer } from 'react-hook-form-mui';
import DialogActions from "@mui/material/DialogActions";
import { LoadingButton } from "@mui/lab";
import uploadSurveyResponse from "../databaseFunctions/uploadSurveyResponse";
import { useSDK } from "@metamask/sdk-react";

export default function SumbitResponseForm(props: { form: FormParams[], handleClose: any, survey: Survey }) {
    const metamask = useSDK();
    console.log(props.form)
    const [uploading, setUploading] = useState<boolean>(false);

    const handleSubmit = async (data: any) => {
        await uploadSurveyResponse(JSON.stringify(Object.values(data)).slice(1, -1), props.survey, metamask);
        setUploading(true);
    }

    return (
        <FormContainer
            onSuccess={data => handleSubmit(data)}
        >
            <Grid container rowSpacing={3} margin={0}>
                {
                    props.form.map((formParams, index) => <>
                        <Grid item xs={0.5}>
                            <Typography variant="h6">Q{index + 1}</Typography>
                        </Grid>
                        <Grid item xs={5.5}>
                            <Typography variant="h6">{formParams[1].question}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {getSurveyComponent(formParams)}
                        </Grid>
                    </>)
                }
            </Grid>
            <DialogActions sx={{position: 'absolute', bottom: 0, backgroundColor: 'white', right:0, width: '100%'}}>
                <Button onClick={props.handleClose}>Cancel</Button>
                <LoadingButton loading={uploading} disabled={uploading} onClick={props.handleClose} type='submit' >Submit</LoadingButton>
            </DialogActions>
        </FormContainer>


    )
}