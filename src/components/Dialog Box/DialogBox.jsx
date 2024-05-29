import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogBox({
                       open,
                       onClose,
                       title,
                       content,
                       onAgree,
                       onDisagree,
                       agreeText = "Yes",
                       disagreeText = "No"
                   }) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDisagree}>
                    {disagreeText}
                </Button>
                <Button onClick={onAgree} autoFocus>
                    {agreeText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}