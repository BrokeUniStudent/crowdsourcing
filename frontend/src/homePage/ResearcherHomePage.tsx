import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SurveyListItem from './SurveyListItem';
import { Role, Survey } from '../types';
import MoreButton from '../moreButton/MoreButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import PollIcon from '@mui/icons-material/Poll';
import { IconButton } from '@mui/material';
import UserProfile from './UserProfile';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ResearcherSurveyListItem from './ResearcherSurveyListItem';
import CreateSurveyForm from '../forms/CreateSurveyForm';
import { Addchart } from '@mui/icons-material';
import { useSDK } from '@metamask/sdk-react';
import { listSurveys } from '../databaseFunctions/listSurveys';


export default function ResearcherHomePage() {
  const [surveyList, setSurveyList] = useState<Survey[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const metamask = useSDK();
  useEffect(() => {
    //fetch and update data
    listSurveys(metamask, Role.researcher).then((values) => setSurveyList(values))
  }, [])

  return (
    <>
      <AppBar position='absolute' style={{ padding: 5 }}>
        <Grid container style={{justifyContent: "space-between"}}>
          <Grid item>
            <Typography variant="h3" component="div">
            <PollIcon fontSize='large' />

              Academic Crowdsourcing Platform
            </Typography>
          </Grid>
          <Grid item style={{alignSelf: 'flex-end'}}>
            <IconButton size='large' color='inherit' onClick={() => setOpenDrawer(true)}>
              <Addchart fontSize='large' />
            </IconButton>

          </Grid>
        </Grid>

      </AppBar>

      <Container sx={{ paddingTop: '100px' }}>

        <Grid container spacing={4} sx={{ width: '100%' }}>
          {surveyList.map(survey => (
            <ResearcherSurveyListItem key={survey.id} survey={survey} />
          ))}
        </Grid>
      </Container>

      <CreateSurveyForm open={openDrawer} handleClose={() => setOpenDrawer(false)} />

    </>
  );
}