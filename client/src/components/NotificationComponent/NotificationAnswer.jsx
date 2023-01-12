import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function NotificationAnswer() {
  const [open, setOpen] = React.useState(false);
  console.log(open, 'OPENOPEN');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '50%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Ваша заявка одобрена! Добро пожаловать в команду!
        </Alert>
      </Snackbar>
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        Ваша заявка одобрена! Добро пожаловать в команду!
      </Alert>
    </Stack>
  );
}
