import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from './AppBar';
import Toolbar, {styles as toolbarStyles} from './Toolbar';

const styles = (theme) => ({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.palette.common.white,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
    },
    leftLinkActive: {
        color: theme.palette.common.white,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontWeight: 'bold',
        fontSize: 14,
        color: theme.palette.common.white,
        marginLeft: theme.spacing(3),
    },
    linkSecondary: {
        color: theme.palette.secondary.main,
    },
});

function AppAppBar(props) {
    const {classes} = props;

    return (
        <div>
            <AppBar position="fixed" style={{background: 'rgba(6,6,6,0.89)'}}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left}/>
                    <Link
                        variant="h6"
                        underline="none"
                        color="inherit"
                        className={classes.title}
                        href="/"
                    >
                        {'MEDIBLOCKS'}
                    </Link>
                    <div className={classes.right}>
                        <Link
                            color="inherit"
                            variant="h6"
                            underline="none"
                            className={classes.rightLink}
                            href="/adminLogin"
                        >
                            {'SIGN IN'}
                        </Link>
                        <Link
                            variant="h6"
                            underline="none"
                            className={clsx(classes.rightLink, classes.linkSecondary)}
                            href="/registerAdmin"
                        >
                            {'SIGN UP'}
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder}/>
        </div>
    );
}

AppAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);