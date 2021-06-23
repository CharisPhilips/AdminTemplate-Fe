import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {
    onYes,
    onNo,
    title,
    message,
    ...other
  } = props

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose(isYes) {
    setOpen(false);
    if (isYes && onYes != null) {
      onYes();
    }
    if (!isYes && onNo != null) {
      onNo();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...other}
    >
      <DialogTitle id="alert-dialog-title">
        { title }
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
         { message }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(true)} color="primary">
          Yes
        </Button>
        <Button onClick={() => handleClose(false)} color="Secondary" autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
