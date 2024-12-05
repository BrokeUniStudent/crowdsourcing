import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { Assignment, BarChart, DeleteForever, LinearScale } from '@mui/icons-material';
import { SurveyQuestionTypes } from '../types';





export default function MoreButton(props: {handleAdd: any}) {
    const actions = [
        { icon: <LinearScale />, name: 'Likert', func: (() => props.handleAdd(SurveyQuestionTypes.scale))},
        { icon: <Assignment />, name: 'Text', func: () => props.handleAdd(SurveyQuestionTypes.text)},
        { icon: <BarChart />, name: 'Selection', func: () => props.handleAdd(SurveyQuestionTypes.selection) },
        // { icon: <DeleteForever />, name: 'Delete' },
    ];
    return (
        <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            sx={{ position: 'absolute', bottom: 16, left: 16 }}
            icon={<SpeedDialIcon openIcon={<AddIcon />} />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.func}
                />
            ))}
        </SpeedDial>
    );
}