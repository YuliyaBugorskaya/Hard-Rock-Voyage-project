import React, { useState } from 'react';
import {
  Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import axios from 'axios';

export default function FormDialog() {
  const [input, setInput] = useState('');

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const textData = Object.fromEntries(new FormData(e.target));
    console.log(textData);
    axios.post('comment/addComment', textData);
    console.log(input);
    console.log(e.target.value);
  };

  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      display="flex"
      autoComplete="off"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <form onSubmit={submitHandler}>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              name="text"
              autoFocus
              margin="dense"
              id="textComment"
              label="Email Address"
              type="text"
              fullWidth
              variant="standard"
              value={input}
              onChange={inputHandler}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
