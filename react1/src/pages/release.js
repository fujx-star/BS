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
import Button from "@mui/material/Button";
import {AppBar} from "../render/style";
import {Drawer} from "../render/style";
import {mdTheme} from "../render/style";
import Navlist from "../Router/navlist";
import axios from "axios";
import {useEffect} from "react";
import qs from "qs";
import SendIcon from '@mui/icons-material/Send';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";


export default function Taskhall() {
    const [username] = React.useState(useLocation().state.username)
    const [open, setOpen] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [images, setImages] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [times, setTimes] = React.useState(0)
    const toggleDrawer = () => {
        setOpen(!open);
    };

    let form_data = qs.stringify({username: username})
    useEffect(() => {
        axios.post('http://localhost:8082/addtask', form_data
        ).then(response => {
            setRows(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    useEffect(() => {}, [times])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleAdd(id) {
        return () => {
            let index = images.indexOf(id)
            if(index === -1) {
                let mid = images
                mid.push(id)
                setImages(mid)
                setTimes(times+1)
            }
            else {
                alert('You have chosen the image!')
            }
        }
    }

    function handleReduce(id) {
        return () => {
            let index = images.indexOf(id)
            if(index === -1) {
                alert("You haven't chosen the image!")
            }
            else {
                let mid = images
                mid.splice(index, 1)
                setImages(mid)
                setTimes(times-1)
            }
        }
    }

    function handleExport(id) {
        return () => {
            axios.get('http://localhost:8082/exportimage', {
                params: {username: username, id: id}
            }).then(response => {
                if(response.data) {
                    alert('Export succeed!')
                }
                else {
                    alert('Export failed!')
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }

    const handleRelease = () => {
        console.log(images)
        axios.post('http://localhost:8082/releasetask', images
        ).then(response => {
            if(response.data) {
                alert('Release succeed!')
            }
            else {
                alert('Release fail!')
            }
        }).catch(error => {
            console.log(error);
        })
    }

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
                    <Paper sx={{  width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 455 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <caption>You have chosen {times} images</caption>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((rows) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={rows['tasknum']}>
                                                    {columns.map((column) => {
                                                        const value = rows[column.id];
                                                        if(column.id === 'id' || column.id === 'name') {
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {value}
                                                                </TableCell>
                                                            );
                                                        }
                                                        else if(column.id === 'add' || column.id === 'reduce') {
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    <Button onClick={
                                                                        column.id === 'add'?
                                                                        handleAdd(rows['id']):handleReduce(rows['id'])
                                                                    }>
                                                                        {column.label}
                                                                    </Button>
                                                                </TableCell>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    <TableCell key={column.id} align={column.align}>
                                                                        <Button onClick={handleExport(rows['id'])}>
                                                                            {column.label}
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableCell>
                                                            )
                                                        }
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button
                            outlined="true"
                            endIcon={<SendIcon />}
                            onClick={handleRelease}
                        >
                            Release
                        </Button>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>

                </Box>

            </Box>
        </ThemeProvider>
    );
}

const columns = [
    { id: 'id', label: 'ID', minWidth: 150, align: 'center'},
    { id: 'name', label: 'Name', minWidth: 200, align: 'center' },
    {
        id: 'add',
        label: 'Add',
        minWidth: 50,
        align: 'center',
    },
    {
        id: 'reduce',
        label: 'Reduce',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'export',
        label: 'Export',
        minWidth: 100,
        align: 'center'
    }
];


