import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, Button, createStyles, Theme} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";

export default () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }),
    );

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Step Challenge
                </Typography>
                <Button color="inherit">Team Admin</Button>
            </Toolbar>
        </AppBar>
    );
}
