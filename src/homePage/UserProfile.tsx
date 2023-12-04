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
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Close, Delete } from '@mui/icons-material';

export default function UserProfile(props: { open: boolean, toggleDrawer: Function }) {
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
                        Personal Details
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Name on card"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Card number"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Expiry date"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        label="Ethnicity"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography gutterBottom>
                        I would like to share my survey responses to
                    </Typography>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" checked={true} disabled />}
                        label="researchers of participated surveys respectively"
                    />
                    <br />
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="reviewers"
                    />
                    <br />
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                        label="other researchers"
                    />
                    
                    <Typography>
                        who are certified by registered academic organisations
                    </Typography>
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </Drawer>
    )
}