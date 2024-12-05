import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import SurveyListItem from './SurveyListItem';
import { Role, Survey } from '../types';
import MoreButton from '../moreButton/MoreButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import PollIcon from '@mui/icons-material/Poll';
import { IconButton } from '@mui/material';
import UserProfile from './UserProfile';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { HistoryEdu } from '@mui/icons-material';
import UserHistory from './UserHistory';
import { listSurveys } from '../databaseFunctions/listSurveys';
import { useSDK } from '@metamask/sdk-react';


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

export default function HomePage() {
  const [surveyList, setSurveyList] = useState<Survey[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openHistory, setOpenHistory] = useState(true);
  
  const metamask = useSDK();
  useEffect(() => {
    //fetch and update data
    listSurveys(metamask, Role.participant).then((values) => setSurveyList(values))
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
            <IconButton size='large' color='inherit' onClick={() => setOpenDrawer(prev => !prev)}>
              <AccountBoxIcon fontSize='large' />
            </IconButton>
            <IconButton size='large' color='inherit' onClick={() => setOpenHistory(prev => !prev)}>
              <HistoryEdu fontSize='large' />
            </IconButton>

          </Grid>
        </Grid>

      </AppBar>

      <Container sx={{ paddingTop: '100px' }}>

        <Grid container spacing={4} sx={{ width: '100%' }}>
          {surveyList.map(survey => (
            <SurveyListItem key={survey.id} survey={survey} />
          ))}
        </Grid>
      </Container>

      <UserProfile open={openDrawer} toggleDrawer={setOpenDrawer} />
      <UserHistory open={openHistory} toggleDrawer={() => setOpenHistory(false)} />
    </>
  );
}