import { Grid, Typography } from "@mui/material";
import { FormParams } from "../types";
import getSurveyComponent, { Textbox, Scale, Selection } from "./SurveyComponents";

export default function SumbitResponseForm(props: { form: FormParams[] }) {
    return (
        <Grid container rowSpacing={3} width={'90vw'}>
            {
                props.form.map(formParams => <>
                    <Grid item xs={6}>
                        <Typography variant="h6">{formParams[1].question}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {getSurveyComponent(formParams)}
                    </Grid>
                </>)
            }
        </Grid>
    )
}