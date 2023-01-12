import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export default function Notification() {
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
          Вам пришла заявка! Посмотрите ее в личном кабинете.
        </Alert>
      </Snackbar>
      <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
        Вам пришла заявка! Посмотрите ее в личном кабинете.
        <Link to="/adminAnkets" state={setOpen}>
          <Button color="secondary" size="small">
            Посмотреть
          </Button>
        </Link>
      </Alert>
    </Stack>
  );
}
