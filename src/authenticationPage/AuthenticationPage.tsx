import { Grid, Divider } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import PollIcon from '@mui/icons-material/Poll';

export default function AuthenticationPage() {
    return (
        <>
            <AppBar position='relative' style={{ padding: 5 }}>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                    <PollIcon fontSize='large' />
                    Academic Crowdsourcing Platform
                </Typography>
            </AppBar>
            <Grid container>
                <Grid item xs={6}>
                    <SignIn />
                </Grid>

                {/* <Grid item xs={2}>
                    <Divider orientation="vertical" flexItem />
                </Grid> */}

                <Grid item xs={6}>
                    <SignUp />

                </Grid>
            </Grid>
        </>
    );
}