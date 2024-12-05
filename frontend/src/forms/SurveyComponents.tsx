import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import _ from 'lodash';
import { SelectParams, TextParams, ScaleParams, FormParams, SurveyQuestionTypes } from '../types';
import { AutocompleteElement, CheckboxButtonGroup, SliderElement, TextFieldElement } from 'react-hook-form-mui';

export const Textbox = (props: { params: TextParams }) => {
    return (
        <TextFieldElement
            name={props.params.question}
            fullWidth
            multiline
            rows={Math.floor(props.params.maxWordCount / 50)}
        />)

}

export const Scale = (props: { params: ScaleParams }) => {
    return (
        <SliderElement
            name={props.params.question}
            step={1}
            marks={props.params.labels.map((label, index) => ({
                value: index,
                label: label,
            }))}
            max={props.params.labels.length - 1}
            sx={{ width: '80%', ml: 5 }}
        />

    )
}

export function Selection(props: { params: SelectParams }) {
    const { question, selections, minSelections, maxSelections } = props.params;
    if (maxSelections > 1) {
        return getMultiSelect(props.params);
    } else {
        // return (
        // <Autocomplete
        //     disablePortal
        //     options={selections}
        //     sx={{ width: 300 }}
        //     renderInput={(params) => <TextField {...params} label={question} />}
        // />)
        return (
            <AutocompleteElement
                name={question}
                options={selections.map(selection => ({ id: selection, label: selection }))}
            />
        )
    }

}

const getMultiSelect = (props: SelectParams) => {
    const { question, selection, minSelections, maxSelections } = props;

    // const [states, setStates] = React.useState(selections.map(() => false));

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setStates(prevStates => {
    //         prevStates[parseInt(event.target.name)] = event.target.checked;
    //         return prevStates;
    //     });
    // };

    // const error = _.inRange(states.filter((v) => v).length, minSelections, maxSelections);

    return (

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            {/* <FormGroup>
                {selections.map((selection, index) => <FormControlLabel
                    key={index}
                    control={
                        <Checkbox name={index.toString()} checked={states[index]} onChange={handleChange} />
                    }
                    label={selection}
                />)}
            </FormGroup> */}
            <CheckboxButtonGroup name={question} options={selection.map((option, index) => ({ id: index, label: option }))} />
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