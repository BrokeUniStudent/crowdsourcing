import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import SurveyListItem from './SurveyListItem';
import { Survey } from '../types';
import MoreButton from '../moreButton/MoreButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import PollIcon from '@mui/icons-material/Poll';
import { IconButton } from '@mui/material';
import UserProfile from './UserProfile';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


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
  const [surveyList, setSurveyList] = useState<Survey[]>(defaultSurveyList);
  const [openDrawer, setOpenDrawer] = useState(true);

  useEffect(() => {
    //fetch and update data
  }, [surveyList])

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

          </Grid>
        </Grid>

      </AppBar>

      <Container sx={{ paddingTop: '100px' }}>

        <Grid container spacing={4} sx={{ width: '100%' }}>
          {surveyList.map(survey => (
            <SurveyListItem key={survey.title} survey={survey} />
          ))}
          <MoreButton />
        </Grid>
      </Container>

      <UserProfile open={openDrawer} toggleDrawer={setOpenDrawer} />
    </>
  );
}