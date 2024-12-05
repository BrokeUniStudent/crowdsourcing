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
import Dialog from '@mui/material/Dialog';
import ReviewDialog from '../forms/ReviewDialog';

export default function ReviewerSurveyListItem({ survey } : SurveyProps) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <CardActionArea onClick={() => setOpen(true)}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {survey.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {survey.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Check Data
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      <ReviewDialog survey={survey} open={open} handleClose={handleClose} />
    </>

  );
}