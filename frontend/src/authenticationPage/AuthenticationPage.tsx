import { Grid, Divider } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import PollIcon from '@mui/icons-material/Poll';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import { SetStateAction, useState } from 'react';
import { useSDK } from '@metamask/sdk-react';
import RoleSelection from './RoleSelection';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Role } from '../types';
import { IExecDataProtector } from '@iexec/dataprotector';

// export const dataProtector = new IExecDataProtector(window.ethereum);

export default function AuthenticationPage(props: { setRole: any }) {
    const [tempRole, setTempRole] = useState<Role>();

    const { sdk, connected, connecting, provider, chainId, account } = useSDK();

    const connect = async () => {
        try {
            await sdk?.connect();
            if (!connected){
                alert('please approve request with metamask');
            } else {

                props.setRole(tempRole);
            }
        } catch (err) {
            alert(`failed to connect..`);
        }
    };
    return (
        <>
            <AppBar position='relative' style={{ padding: 5 }}>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                    <PollIcon fontSize='large' />
                    Academic Crowdsourcing Platform
                </Typography>
            </AppBar>
            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in as
                    </Typography>
                        <ToggleButtonGroup
                            value={tempRole}
                            exclusive
                            onChange={(e, value) => setTempRole(value as Role)}
                            aria-label="text alignment"
                            color="primary"
                        >
                            {Object.keys(Role).map((role: string) => <ToggleButton key={role} value={role}>{role}</ToggleButton>)}
                        </ToggleButtonGroup>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // component={Link}
                            // to='/home'
                            onClick={connect}
                        >
                            Sign In with MetaMask Wallet
                        </Button>
                </Box>
            </Container>
            {/* 
            <Grid container>
                <Grid item xs={6}>
                    <SignIn />
                </Grid>

                <Grid item xs={6}>
                    <SignUp />

                </Grid>
            </Grid> */}
        </>
    );
}