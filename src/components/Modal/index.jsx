import React from 'react';
import propType from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { IconButton, withStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Info from '@material-ui/icons/Info';
import Success from '@material-ui/icons/Check';
import Warning from '@material-ui/icons/Warning';
import Error from '@material-ui/icons/Error';


const TYPE = {
    WARNING: "warn",
    INFORMATION: "info",
    SUCCESS: "success",
    ERROR: "error"
};

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        display: 'inline-flex'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

function getIconByVariant(variant) {
    switch (variant) {
        case TYPE.INFORMATION: return <Info htmlColor="#1976d2" />
        case TYPE.WARNING: return <Warning htmlColor="#ffa000" />
        case TYPE.SUCCESS: return <Success htmlColor="#43a047" />
        case TYPE.ERROR: return <Error htmlColor="#d32f2f" />
        default: break;
    }
}

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, closable, variant, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            {getIconByVariant(variant)}
            <Typography variant="h6" style={{ marginLeft: '10px' }}>{children}</Typography>
            {onClose && closable ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <Close />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default function AlertDialog({ open, handleClose, dialogTitle, dialogContentText, onDisagreeClick, onAgreeClick, agreeNameButton, disagreeNameButton, closable = false, variant }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" onClose={handleClose} closable={closable} variant={variant}>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogContentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {onAgreeClick && onDisagreeClick ? (
                    <React.Fragment>
                        <Button hidden={!onAgreeClick} onClick={onAgreeClick} color="primary" autoFocus>
                            {agreeNameButton}
                        </Button>
                        <Button hidden={!onDisagreeClick} onClick={onDisagreeClick} color="secondary">
                            {disagreeNameButton}
                        </Button>
                    </React.Fragment>
                ) : !onAgreeClick ? (
                    <Button hidden={!onDisagreeClick} onClick={onDisagreeClick} color="secondary">
                        {disagreeNameButton}
                    </Button>
                ) : !onDisagreeClick ? (
                    <Button hidden={!onAgreeClick} onClick={onAgreeClick} color="primary" autoFocus>
                        {agreeNameButton}
                    </Button>
                ) : null}
            </DialogActions>
        </Dialog>
    );
}

AlertDialog.defaultProps = {
    variant: 'info'
};

AlertDialog.propType = {
    variant: propType.oneOf(["info", "warn", "success", "error"])
};
