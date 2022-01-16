import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import qs from 'qs';
import {useNavigate} from "react-router-dom";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                MUI
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let form_data = qs.stringify({
            username: data.get('username'),
            password: data.get('password'),
            email: data.get('email')
        })
        axios.post('http://localhost:8082/signup', form_data
        ).then(response => {
            switch (response.data) {
                case 0:
                    alert('Sign up succeed!')
                    //跳到登录页面
                    navigate("/signin")
                    break
                case 1:
                    alert('Username is too short!')
                    break
                case 2:
                    alert('Password is too short!')
                    break
                case 3:
                    alert('Email does not exist!')
                    break
                case 4:
                    alert('Username duplication!')
                    break
                case 5:
                    alert('Email duplication!')
                    break
                case 6:
                    alert('Sign up failed!')
                    break
                default:
                    break
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
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
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                helperText="Username should be longer than 6 characters."
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText="Password should be longer than 6 characters."
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    {/*<ProtoLink*/}
                                    {/*    to="../signin"*/}
                                    {/*    style={{ textDecoration: 'none', color: '#3366cc', fontsize: 1 }}*/}
                                    {/*>*/}
                                    {/*    Already have an account? Sign in*/}
                                    {/*</ProtoLink>*/}
                                    <Link
                                        href="http://localhost:3000/signin"
                                        variant="body2"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>

            </ThemeProvider>

        </div>
    )
}



