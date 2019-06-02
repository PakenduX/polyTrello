import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
});

class TaskGroup extends React.Component {
    state = {
        spacing: '2',
    };


    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <Grid container className={classes.root} spacing={4} style={{marginTop: '100px'}}>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        );
    }
}

TaskGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TaskGroup);
