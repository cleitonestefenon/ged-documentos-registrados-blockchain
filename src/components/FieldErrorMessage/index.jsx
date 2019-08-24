import React, { Component } from 'react';
import { Typography, withStyles } from '@material-ui/core';
import styles from './styles';

class FieldErrorMessage extends Component {
    render() {

        const { errors, touched, field, classes } = this.props;

        return (
            <Typography
                className={classes.fieldError}
                variant="body2"
            >
                {touched && errors[field]}
            </Typography>
        );
    }
}

export default withStyles(styles)(FieldErrorMessage);