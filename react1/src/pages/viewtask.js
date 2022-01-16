import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "../copyright";
import {useNavigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {

    const navigate = useNavigate()

    const [username] = useState(useLocation().state.username)
    const [tasknum] = useState(useLocation().state.tasknum)
    const [uploader] = useState(useLocation().state.uploader)
    const [itemData, setItemData] = React.useState([])

    useEffect(() => {
        axios.get('http://localhost:8082/viewtask', {
            params: {tasknum: tasknum}
        }).then(response => {
            setItemData(response.data)
        }).catch(error => {
            console.log(error);
        })
    },[])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Task view
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Task view
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            These are the images in the task {tasknum}
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                onClick={()=>{navigate("/upload", {state: {username: username}, replace: true})}}
                            >
                                Release my task
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={()=>{navigate("/taskhall", {state: {username: username}, replace: true})}}
                            >
                                Return to taskhall
                            </Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 6 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {itemData.map((item,index) => (
                            <Grid item key={item} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={require(`../image/${uploader}/${item}`).default}
                                        alt="random"
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
        </ThemeProvider>
    );
}
