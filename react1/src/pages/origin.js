import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import {Link, NavLink, withRouter} from "react-router-dom";


export default class Origin extends React.Component {

    render() {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Link
                        to="/signin"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button>Sign in</Button>
                    </Link>
                    <NavLink
                        to="/signup"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button>Sign up</Button>
                    </NavLink>
                </ButtonGroup>
            </Box>
        );
    }
}



