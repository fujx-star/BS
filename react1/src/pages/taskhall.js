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
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import {AppBar} from "../render/style";
import {Drawer} from "../render/style";
import {mdTheme} from "../render/style";
import Navlist from "../Router/navlist";
import axios from "axios";
import {useEffect} from "react";
import qs from "qs";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";


export default function Taskhall() {
    const [username] = React.useState(useLocation().state.username)
    const [open, setOpen] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8082/taskhall'
       ).then(response => {
            setRows(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    function handleView(tasknum, uploader){
        return () => {
            navigate("/viewtask", {state: {username: username, tasknum: tasknum, uploader: uploader}, replace: true})
        }
    }

    function handleClaim(tasknum){

        let form_data = qs.stringify({tasknum: tasknum, taskowner: username})

        return () => {
            axios.post('http://localhost:8082/claimtask', form_data
            ).then(response => {
                if(response.data) {
                    alert('Claim succeed!')
                }
                else {
                    alert('Claim fail!')
                }
            }).catch(error => {
                console.log(error);
            })
        }
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
                                                    {columns.map((column, index) => {
                                                        const value = rows[column.id];
                                                        if(column.id === 'tasknum' || column.id === 'uploader' || column.id === 'qty') {
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {value}
                                                                </TableCell>
                                                            );
                                                        }
                                                        else {
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    <Button onClick={
                                                                        column.id === 'view'?
                                                                        handleView(rows['tasknum'], rows['uploader']):handleClaim(rows['tasknum'])}
                                                                    >
                                                                        {column.label}
                                                                    </Button>
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
    { id: 'tasknum', label: 'ID', minWidth: 200, align: 'center'},
    { id: 'uploader', label: 'Provider', minWidth: 200, align: 'center' },
    {
        id: 'qty',
        label: 'Number',
        minWidth: 200,
        align: 'center',
    },
    {
        id: 'view',
        label: 'View',
        minWidth: 180,
        align: 'center',
    },
    {
        id: 'claim',
        label: 'Claim',
        minWidth: 170,
        align: 'center',
    },
];


