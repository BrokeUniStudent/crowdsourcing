import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Close, Delete } from '@mui/icons-material';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FormParams, SurveyProps, SurveyQuestionTypes } from '../types';
import dayjs from 'dayjs';

import { Icon, selectClasses } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import FormDialog from '../forms/FormDialog';

const defaultSurveyList = [
    {
        title: 'A survey for LLMA/ERA usage',
        date: '11/11/2023',
        description:
            'What are your views on LLMA/ERA?',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
    {
        title: 'How can we improve the current national healthcare system?',
        date: '10/12/2023',
        description:
            'We want to hear your views!',
        image: 'https://source.unsplash.com/random?wallpapers',
        imageLabel: 'Image Text',
    },
];

export default function UserHistory(props: { open: boolean, toggleDrawer: Function }) {
    return (
        <Drawer
            anchor='right'
            open={props.open}
            onClose={() => props.toggleDrawer(false)}
        >
            <IconButton disableRipple size='large' onClick={() => props.toggleDrawer(false)} style={{ position: 'absolute', right: 0, margin: 1 }}>
                <Close fontSize='large' />
            </IconButton>

            <Grid container spacing={3} style={{ maxWidth: '100vh', padding: '7vh' }}>
                <Grid item md={12}>
                    <Typography variant="h4" gutterBottom>
                        History
                    </Typography>
                </Grid>
                {defaultSurveyList.map((survey) => (<Grid item xs={12} key={survey.title}>
                    <CardActionArea onClick={() => alert("not ready")}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {survey.title}
                                </Typography>

                                <Typography variant="subtitle1" color="primary">
                                    Expand
                                </Typography>

                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>))}


  
            </Grid>
        </Drawer>
    )
}