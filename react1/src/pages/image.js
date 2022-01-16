import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {useLocation} from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import {AppBar} from "../render/style";
import {Drawer} from "../render/style";
import {mdTheme} from "../render/style";
import Navlist from "../Router/navlist";
import axios from "axios";
import qs from "qs";
import {useEffect} from "react";


export default function Image() {
    const [username] = React.useState(useLocation().state.username)
    const [open, setOpen] = React.useState(true);
    const [itemData, setItemData] = React.useState([]);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    let form_data = qs.stringify({
        username: username,
    })

    useEffect(() => {
        axios.post('http://localhost:8082/myimage', form_data
        ).then(response => {
            setItemData(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />

                    <Navlist username={username}/>

                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={4}>
                            {itemData.map((item,index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    <Card
                                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <CardMedia
                                            component="img"
                                            //注意此处内容：1.使用模板字符串从字典中取值  2.default  3.模板字符串必须如此使用才有效
                                            // image={require("../image/831d73c6e55347b638a7298adf8b218c.jpg").default}
                                            image={require(`../image/${username}/${item}`).default}
                                            alt="random"
                                        />
                                        <CardActions
                                            sx={{ height: '100%', display: 'flex' }}
                                        >
                                            <Button size="small">View</Button>
                                            <Button size="small">Delete</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

            </Box>
        </ThemeProvider>
    );
}
