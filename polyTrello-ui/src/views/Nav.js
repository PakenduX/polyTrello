import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function Nav() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="secondary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        PolyTrello
                    </Typography>
                    {
                        localStorage.getItem("username") === null ?
                            <Link
                                to="/login"
                                style={{textDecoration: 'none'}}
                            >
                                <Button style={{ color: 'white' }}>Login</Button>
                            </Link>: null
                    }
                    {
                        localStorage.getItem("username") === null ?
                            <Link
                                to="/register"
                                style={{textDecoration: 'none'}}
                            >
                                <Button style={{ color: 'white' }}>Register</Button>
                            </Link> : null
                    }
                    {
                        localStorage.getItem("username") !== null ?
                            <Link
                                to="/logout"
                                style={{textDecoration: 'none'}}
                            >
                                <Button
                                    style={{ color: 'white' }}
                                >
                                    Logout
                                </Button>
                            </Link>
                            : null
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Nav;
