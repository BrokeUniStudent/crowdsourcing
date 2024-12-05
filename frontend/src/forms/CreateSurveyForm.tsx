import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { ScaleParams, SelectParams } from '../types';
import { useRef, useState } from 'react';
import { FormParams, SurveyProps, SurveyQuestionTypes } from '../types';
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import MoreButton from '../moreButton/MoreButton';
import SelectionComponent from './SelectionComponent';
import Card from '@mui/material/Card';
import createSurvey from '../databaseFunctions/createSurvey';
import { DateField, DateTimeField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSDK } from '@metamask/sdk-react';

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
            selection: ['Cinema', 'Restaurant', 'Leisure centre', 'Gallery', 'Concert venue'],
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
const exampleSubFieldStates = [5, [0, 5], 500]
const exampleSecondaryFieldStates = [(exampleForm[0][1] as ScaleParams).labels, (exampleForm[1][1] as SelectParams).selection, null]


export default function CreateSurveyForm({ open, handleClose }: { open: boolean, handleClose: any }) {
  const metamask = useSDK();

    // const [submitResponse, setSubmitResponse] = useState();
    // useEffect(() => {
    //     new Promise(resolve => {
    //         setTimeout(resolve, 5000);
    //     }).then(
    //         (res) => setSubmitResponse(true)
    //     )
    // }, [submitResponse]);
    const title = useRef('');
    const description = useRef('');
    const closingTime = useRef('');
    const expiryDate = useRef('');

    const [formQuestionTypes, setFormQuestionTypes] = useState<SurveyQuestionTypes[]>(exampleForm.map(entry => entry[0]));
    const [formQuestions, setFormQuestions] = useState<String[]>(exampleForm.map(entry => entry[1].question))
    const [formSubFieldStates, setFormSubFieldStates] = useState<any[]>(exampleSubFieldStates);
    const [formSecondaryFieldStates, setFormSecondaryFieldStates] = useState<any[]>(exampleSecondaryFieldStates);

    const handleSubmit = async() => {

        const form: SurveyProps =
        {
            survey: { 
                // @ts-expect-error
                title: title.current.value, 
                // @ts-expect-error
                description: description.current.value, 
                // @ts-expect-error
                date: closingTime.current.value, 
                // @ts-expect-error
                expiryDate: expiryDate.current.value },
            formParams: []
        };
        for (const i in formQuestionTypes) {
            const formParam: any[] = [formQuestionTypes[i], { question: formQuestions[i] }]
            if (formParam[0] === SurveyQuestionTypes.selection) {
                formParam[1].minSelections = formSubFieldStates[i][0]
                formParam[1].maxSelections = formSubFieldStates[i][1]
                formParam[1].selection = formSecondaryFieldStates[i]
            } else if (formParam[0] === SurveyQuestionTypes.scale) {
                formParam[1].labels = formSecondaryFieldStates[i]
            } else {
                formParam[1].maxWordCount = formSubFieldStates[i]
            }
            form.formParams?.push(formParam as FormParams);
        }
        await createSurvey(form, metamask);
        handleClose();
    }

    const handleDelete = (questionNumber: number, index: number) => {
        setFormSecondaryFieldStates(prevList => {
            const newList = structuredClone(prevList) || [];
            newList[questionNumber].splice(index, 1);
            return newList;
        })
    }

    const handleAdd = (questionNumber: number, value: string) => {
        setFormSecondaryFieldStates(prevList => {
            const newList = structuredClone(prevList) || [];
            newList[questionNumber].push(value);
            return newList;
        })
    }

    const handleAddQuestion = (type: SurveyQuestionTypes, position?: number) => {
        position = formQuestionTypes.length;
        setFormQuestionTypes(prevList => [...prevList, type]);

        setFormQuestions(prevList => [...prevList, '']);

        let newSubFieldStates: number | number[] = 50;
        let newSecondaryFieldStates: any = null;
        if (type === SurveyQuestionTypes.scale) {
            newSubFieldStates = 5;
            newSecondaryFieldStates = Array(newSubFieldStates).fill('');
        } else if (type === SurveyQuestionTypes.selection) {
            newSubFieldStates = [0, 0];
            newSecondaryFieldStates = [];
        }
        setFormSubFieldStates(prevList => [...prevList, newSubFieldStates]);
        setFormSecondaryFieldStates(prevList => [...prevList, newSecondaryFieldStates]);
    }

    const handleDeleteQuestion = (position: number) => {
        setFormQuestionTypes(prevList => prevList.filter((value, index) => index !== position));
        setFormQuestions(prevList => prevList.filter((value, index) => index !== position));
        setFormSecondaryFieldStates(prevList => prevList.filter((value, index) => index !== position));
        setFormSubFieldStates(prevList => prevList.filter((value, index) => index !== position));
    }

    const handleSubFieldChange = (questionNumber: number, e: any, type?: 0 | 1) => {
        let value = parseInt(e.target.value);
        if (value < 0) {
            return;
        }
        setFormSubFieldStates(prevList => {
            const newList = structuredClone(prevList);
            if (typeof type == 'number') {
                if (type === 0) {
                    if (value > newList[questionNumber][1]) {
                        value = newList[questionNumber][1];
                    };
                } else if (type === 1) {
                    const max = formSecondaryFieldStates[questionNumber].length;
                    if (max <= value) {
                        value = max
                    }
                }
                newList[questionNumber][type] = value;
            } else {
                newList[questionNumber] = value;
            }
            return newList;
        });
    }

    const handleSecondaryFieldChange = (questionNumber: number, e: any, index: number) => {
        const value = e.target.value;
        console.log(value, formSecondaryFieldStates, questionNumber)
        setFormSecondaryFieldStates(prevList => {
            const newList = structuredClone(prevList);
            newList[questionNumber][index] = value;
            return newList;
        })
    }

    const getSubQuestionField = (questionNumber: number) => {
        const type = formQuestionTypes[questionNumber];
        if (type == SurveyQuestionTypes.scale) {
            return (

                <FormControl fullWidth >
                    <InputLabel>Number of options</InputLabel>
                    <Select
                        onChange={e => handleSubFieldChange(questionNumber, e)}
                        value={formSubFieldStates[questionNumber]}
                    >
                        {[4, 5, 6, 7].map(key => <MenuItem value={key} key={key}>{key}</MenuItem>)}

                    </Select>
                </FormControl>

            )
        } else if (type == SurveyQuestionTypes.selection) {
            return (
                <FormControl fullWidth >
                    {/* <InputLabel>Number of selections</InputLabel> */}
                    <Stack direction={'row'} spacing={2}>
                        <TextField
                            label='Min'
                            type='number'
                            placeholder='Min'
                            onChange={e => { handleSubFieldChange(questionNumber, e, 0) }}
                            value={formSubFieldStates[questionNumber][0]}
                        />
                        <TextField
                            label='Max'
                            type='number'
                            placeholder='Max'
                            onChange={e => { handleSubFieldChange(questionNumber, e, 1) }}
                            value={formSubFieldStates[questionNumber][1]}
                        />
                    </Stack>
                </FormControl>
            )
        } else if (type == SurveyQuestionTypes.text) {
            return (
                <FormControl fullWidth >
                    {/* <InputLabel>Max Word Count</InputLabel> */}
                    <TextField
                        type='number'
                        onChange={e => handleSubFieldChange(questionNumber, e)}
                        value={formSubFieldStates[questionNumber]}
                        label='Max Word Count'
                    />
                </FormControl>
            )
        }

    }

    const getSecondaryQuestionField = (questionNumber: number) => {
        const type = formQuestionTypes[questionNumber];
        if (type == SurveyQuestionTypes.scale) {
            return (
                <FormControl fullWidth >
                    {/* <InputLabel>Labels(from left to right)</InputLabel> */}
                    <Stack direction={'row'} spacing={2}>

                        {Array.from(Array(formSubFieldStates[questionNumber]).keys()).map((index: number) =>
                            <TextField
                                key={index}
                                value={(formSecondaryFieldStates[questionNumber] ?? [])[index]}
                                onChange={(e) => handleSecondaryFieldChange(questionNumber, e, index)}
                                label='Labels(from left to right)'
                            />)
                        }
                    </Stack>
                </FormControl>

            )
        } else if (type == SurveyQuestionTypes.selection) {
            return (
                <SelectionComponent
                    handleAdd={(value: string) => handleAdd(questionNumber, value)}
                    handleDelete={(index: number) => handleDelete(questionNumber, index)}
                    choices={formSecondaryFieldStates[questionNumber]}
                />
            );
        }

    }

    return (<Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent>
            <Card sx={{ padding: 3, margin: 3 }}>
                <Grid container spacing={3}>

                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en'>
                                <DateTimeField label='Closing Time' disablePast inputRef={closingTime} />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={1.5}>
                        <FormControl fullWidth >
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                                <DateField label='Expiry Date' disablePast inputRef={expiryDate} />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={8.5}>
                        <TextField label='Title' fullWidth inputRef={title} multiline />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Description(max 150 characters)' fullWidth inputRef={description} multiline />
                    </Grid>

                </Grid>


            </Card>
            {Array.from(Array(formQuestionTypes.length).keys()).map((i: number) => {
                return (
                    <Card sx={{ padding: 3, margin: 3, paddingTop: 2 }} key={i}>
                        <Grid container spacing={3}>

                            <Grid item xs={11.5}>
                                <Typography variant='h5'>Q{i + 1}</Typography>
                            </Grid>

                            <Grid item xs={0.5}>
                                <IconButton onClick={() => handleDeleteQuestion(i)}>
                                    <Close fontSize='small' />
                                </IconButton>
                            </Grid>

                            <Grid item xs={1.5}>
                                <FormControl fullWidth >
                                    <InputLabel>Question Type</InputLabel>
                                    <Select
                                        label='Question Type'
                                        value={formQuestionTypes[i]}
                                        onChange={(e: SelectChangeEvent) => {
                                            setFormQuestionTypes(prevList => {
                                                const newList = [...prevList]
                                                newList[i] = e.target.value as SurveyQuestionTypes;
                                                return newList;
                                            })
                                        }}>
                                        {Object.values(SurveyQuestionTypes).map((value, index) =>
                                            <MenuItem value={value} key={index}>{value}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={10.5}>
                                <FormControl fullWidth>
                                    {/* <InputLabel>Question</InputLabel> */}
                                    <TextField
                                        multiline
                                        value={formQuestions[i]}
                                        label='Question'
                                        onChange={({ target }) => {
                                            setFormQuestions(prevList => {
                                                const newList = structuredClone(prevList);
                                                newList[i] = target.value;
                                                return newList
                                            })
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={1.5}>
                                {getSubQuestionField(i)}
                            </Grid>


                            <Grid item xs={10.5}>
                                {getSecondaryQuestionField(i)}
                            </Grid>

                        </Grid>

                    </Card>
                )
            })}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
        <MoreButton handleAdd={handleAddQuestion} />
    </Dialog>)
}