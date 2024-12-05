import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FormParams, SurveyProps, SurveyQuestionTypes } from '../types';
import dayjs from 'dayjs';
import SecurityIcon from '@mui/icons-material/Security';
import { Icon, Input, selectClasses } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import FormDialog from '../forms/FormDialog';
import ViewDialog from '../forms/ViewDialog';
import UploadDialog from '../forms/UploadDialog';

export default function ResearcherSurveyListItem({ survey }: SurveyProps) {
  const [open, setOpen] = React.useState(false);
  const [openUploadDialog, setUploadDialog] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <CardActionArea>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              
              <Typography component="h2" variant="h5">
                {survey.reviewResult &&  <SecurityIcon color='info' />}
                {survey.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Closing in {survey.date? dayjs().diff(survey.date, 'day') + 1: 'unlimited'} days
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {survey.description}
              </Typography>
              <Typography variant="subtitle1" color="primary" onClick={() => setOpen(true)}>
                View Data
              </Typography>
              <Typography variant="subtitle1" color="primary" onClick={() => setOpen(true)}>
                Download Data
              </Typography>
              {/* {dayjs(survey.date) > dayjs() ? */}
              {!survey.reviewResult&&
                <Typography variant="subtitle1" color="primary" onClick={() => setUploadDialog(true)}>
                  Upload Data
                </Typography>

              }

              {/* : null} */}

            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      <ViewDialog survey={survey} open={open} handleClose={handleClose} />
      <UploadDialog survey={survey} open={openUploadDialog} handleClose={() => setUploadDialog(false)} />
    </>

  );
}