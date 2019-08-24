import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import styles from './styles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    componentDidUpdate(prevProps) {
        const { timestamp, callback } = this.props;

        if (prevProps.timestamp !== timestamp) {
            this.setState({ open: true });
            callback && callback()
        }
    }

    onClose = async () => {
        this.setState({ open: false })
    }

    render() {

        const { classes, className, message, variant, anchorOrigin, autoHideDuration, ...other } = this.props;

        const Icon = variantIcon[variant];

        return (
            <Snackbar
                anchorOrigin={anchorOrigin}
                open={this.state.open}
                autoHideDuration={autoHideDuration}
                onClose={this.onClose}
            >
                <SnackbarContent
                    className={clsx(classes[variant], className)}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <Icon className={clsx(classes.icon, classes.iconVariant)} />
                            {message}
                        </span>
                    }
                    action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={() => this.setState({ open: false })}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>,
            ]}
                    {...other}
                />
            </Snackbar>

        );
    }
}

Notification.defaultProps = {
    anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
    },
    autoHideDuration: 4000,
    variant: "success"
}

Notification.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const mapStateToProps = store => ({
    ...store.notification
});

export default withStyles(styles)(connect(mapStateToProps)(Notification));