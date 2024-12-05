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
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import { getSurveyColumnNames } from '../databaseFunctions/getSurvey';
const getSurveyColumnNames = (surveyTitle:string) => []

export default function SurveyResultTable(props: { surveyTitle: string }) {
    const [data, setData] = useState<any[]>([]);
    const [columnNames, setColumnNames] = useState<any[]>(getSurveyColumnNames(props.surveyTitle));
    // useEffect(() => {
    //     new Promise(resolve => {
    //         setTimeout(resolve, 5000);
    //     }).then(
    //         (res) => setColumnNames(getSurveyColumnNames(props.surveyTitle))
    //     )
    // }, []);
    let content = <Box position='fixed' top='49vh' left='49vw'><CircularProgress /></Box>;

    const columns = columnNames.map((name) => ({
        accessorKey: name,
        header: name,
    }))

    let table = useMaterialReactTable({ columns, data, enableColumnResizing: true, muiTablePaperProps: { sx: { height: '100%' } } })


return <MaterialReactTable table={table} />;
}