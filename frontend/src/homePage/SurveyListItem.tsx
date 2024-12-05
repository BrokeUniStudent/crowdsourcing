import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { readFile } from '../databaseFunctions/IPFSfunctions';
import { FormParams, SurveyProps, SurveyQuestionTypes } from '../types';
import dayjs from 'dayjs';

import { Icon, selectClasses } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import FormDialog from '../forms/FormDialog';

export default function SurveyListItem({ survey } : SurveyProps) {
  const [open, setOpen] = useState(false);

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
              <Typography variant="subtitle1" color="text.secondary">
                Closing in {dayjs().diff(survey.date, 'day') + 1} days
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {survey.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Participate now
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
      <FormDialog survey={survey} open={open} handleClose={handleClose} />
    </>

  );
}