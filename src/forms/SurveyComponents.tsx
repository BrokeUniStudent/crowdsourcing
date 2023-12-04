import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import _ from 'lodash';
import Slider from '@mui/material/Slider';
import { Autocomplete, TextField, Grid } from '@mui/material';
import { SelectParams, TextParams, ScaleParams, FormParams, SurveyQuestionTypes } from '../types';

export const Textbox = (props: { params: TextParams }) => {
    return (
        <TextField
            fullWidth
            multiline
            rows={Math.floor(props.params.maxWordCount / 50)}
        />)

}

export const Scale = (props: { params: ScaleParams }) => {
    return (
        <Slider
            step={1}
            marks={props.params.labels.map((label, index) => ({
                value: index,
                label: label,
            }))}
            max={props.params.labels.length -1}
            sx={{ width: '90%', ml: 5 }}
        />

    )
}

export function Selection(props: { params: SelectParams }) {
    const { question, selections, minSelections, maxSelections } = props.params;
    if (maxSelections > 1) {
        return getMultiSelect(props.params);
    }
    return (
        <Autocomplete
            disablePortal
            options={selections}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={question} />}
        />)
}

const getMultiSelect = (props: SelectParams) => {
    const { question, selections, minSelections, maxSelections } = props;

    const [states, setStates] = React.useState(selections.map(() => false));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStates(prevStates => {
            prevStates[parseInt(event.target.name)] = event.target.checked;
            return prevStates;
        });
    };

    const error = _.inRange(states.filter((v) => v).length, minSelections, maxSelections);

    return (

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard" error={error}>
            <FormGroup>
                {selections.map((selection, index) => <FormControlLabel
                    key={index}
                    control={
                        <Checkbox name={index.toString()} checked={states[index]} onChange={handleChange} />
                    }
                    label={selection}
                />)}
            </FormGroup>
            <FormHelperText>Select between {minSelections} and {maxSelections} inclusive</FormHelperText>
        </FormControl>
    )
}

export default function getSurveyComponent(formParams: FormParams) {
    if (formParams[0] == SurveyQuestionTypes.selection) {
        return <Selection params={(formParams[1]) as SelectParams} />;
    }
    if (formParams[0] == SurveyQuestionTypes.scale) {
        return <Scale params={(formParams[1]) as ScaleParams} />;
    }
    if (formParams[0] == SurveyQuestionTypes.text) {
        return <Textbox params={(formParams[1] as TextParams)} />;
    }
}