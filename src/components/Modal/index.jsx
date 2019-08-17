import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({ open, handleClose, dialogTitle, dialogContentText, onDisagreeClick, onAgreeClick, agreeNameButton, disagreeNameButton }) {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogContentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button hidden={!onDisagreeClick} onClick={onDisagreeClick} color="primary">
                    {disagreeNameButton}
                </Button>
                <Button hidden={!onAgreeClick} onClick={onAgreeClick} color="primary" autoFocus>
                    {agreeNameButton}
                </Button>
            </DialogActions>
        </Dialog>
    );
}