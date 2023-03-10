import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getOneEvent } from '../../redux/YanaSlices/oneEventSlice';
import GetAllPoints from '../Map/GetAllPoints';
import OneComment from './OneComment';
import { getAllComments } from '../../redux/YanaSlices/CommentsSlice';
// import PointForm from '../Map/GetAllPoints';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

export default function EventPage() {
  const [input, setInput] = useState({ text: '', message: '' });
  const [img, setImg] = useState(null);
  const [foto, setFoto] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [comment, setComment] = useState(false);

  const handleCloseComment = () => {
    setComment(false);
  };

  const { id } = useParams();

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const textData = Object.fromEntries(new FormData(e.target));
    axios.post(`comment/addComment/${id}`, textData)
      .then(() => dispatch({ type: 'SEND_PUSH', payload: { message: textData, id } }));
  };

  const OneEvent = useSelector((state) => state.oneEvent);
  const allComments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.user);

  // const inputHandler = (e) => {
  //   setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandlerComments = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('fotoComment', img);
    data.append('actionId', id);
    data.append('text', input.text);
    axios.post('/api/addComments', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then((res) => {
        setFoto((res.data.path));
        dispatch(getAllComments(id));
      })

      .then(() => setOpen(false));
  };

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, []);

  useEffect(() => {
    dispatch(getAllComments(id));
  }, [id]);

  const handleClickOpenComment = () => {
    setComment(true);
  };

  return (
    <Box sx={{
      backgroundImage: `url(http://localhost:3001/${OneEvent?.image})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
    >
      <CssBaseline />
      <Container fixed>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ margin: '5px', width: '98%' }}>

            <Grid
              item
              xs={12}
              sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: '50px',
                  marginBottom: '10px',
                  backgroundColor: 'white',
                  opacity: '0.8',
                  borderRadius: '20px',
                  width: 'fit-content',
                  paddingX: '40px',
                  marginY: '20px',
                }}
              >
                {OneEvent.description}
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                backgroundColor: 'white', borderRadius: '20px', padding: '16px', opacity: '0.8',
              }}
            >
              <Typography component="div">
                ??????????????????????:
                {' '}
                {/* <Button variant="text" onClick={() => seeUser()}>
          {' '}
          {OneEvent?.User?.name}
        </Button> */}
                {OneEvent?.User?.name}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={`http://localhost:3001/${OneEvent?.User?.image}`}
                  alt="Live from space album cover"
                />
              </Stack>
            </Grid>

            <Grid
              container
              xs={7}
            >
              <Grid
                item
                xs={12}
                sx={{
                  backgroundColor: 'white', borderRadius: '20px', marginLeft: '40px', padding: '16px', height: '80%', opacity: '0.8',
                }}
              >
                <Typography component="div">
                  {OneEvent.title}
                </Typography>
                <Divider />
                <Typography component="div">
                  {OneEvent.fulldescription}
                </Typography>
              </Grid>

              {OneEvent.userId !== user.id && OneEvent.statusId === 4 ? (
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginLeft: '40px', textAlign: 'center',
                  }}
                >
                  <Button
                    variant="text"
                    onClick={handleClickOpen}
                    sx={{
                      backgroundColor: '#81858a',
                      borderRadius: '20px',
                      padding: '8px',
                      width: '100%',
                      color: 'black',
                      height: '100%',
                    }}
                  >
                    ???????????? ???????????? ???? ??????????????
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>?????????????????????? ???? ??????????????</DialogTitle>
                    <form onSubmit={submitHandler}>
                      <DialogContent>
                        <DialogContentText>
                          ????????????????, ???????????? ???? ???????????? ???????????????????????????????????? ???? ?????? ??????????????.
                        </DialogContentText>
                        <TextareaAutosize
                          name="message"
                          type="text"
                          variant="standard"
                          autoFocus
                          aria-label="minimum height"
                          minRows={3}
                          placeholder="Minimum 3 rows"
                          value={input.message}
                          onChange={changeHandler}
                          style={{ width: '-webkit-fill-available', marginTop: '10px' }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>????????????</Button>
                        <Button type="submit" onClick={handleClose}>??????????????????</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </Grid>
              ) : (
                <>
                </>
              )}

              {OneEvent.statusId === 6
              && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginLeft: '40px', textAlign: 'center',
                  }}
                >
                  <Button
                    onClick={handleClickOpenComment}
                    variant="text"
                    sx={{
                      backgroundColor: 'white',
                      opacity: '0.9',
                      borderRadius: '20px',
                      padding: '8px',
                      width: '100%',
                      color: 'black',
                      height: '100%',
                    }}
                  >
                    ???????????????? ??????????????????????
                  </Button>

                  <Dialog open={comment} onClose={handleCloseComment}>
                    <DialogTitle>???????????????? ??????????????????????????</DialogTitle>
                    <form onSubmit={submitHandlerComments}>
                      <DialogContent>
                        <DialogContentText>
                          ???????????????? ?????????????????????? ?? ????????
                        </DialogContentText>
                        <TextareaAutosize
                          name="text"
                          type="text"
                          variant="standard"
                          autoFocus
                          aria-label="minimum height"
                          minRows={3}
                          placeholder="Minimum 3 rows"
                          value={input.text}
                          onChange={changeHandler}
                          style={{ width: '-webkit-fill-available', marginTop: '10px' }}
                        />
                        {
                          foto
                          && (
                            <img
                              className="logo"
                              src={`http://localhost:3001/${foto}`}
                              alt="avatar"
                              style={{
                                width: '100%',
                                height: 'auto',
                              }}
                            />
                          )
                        }
                        <Typography variant="h10" component="h5" sx={{ flexGrow: 1 }}>
                          ???????????? ???????? ?? ??????????????
                        </Typography>
                        <input
                          name="fotoFromVoyage"
                          type="file"
                          onChange={(e) => {
                            setImg(e.target.files[0]);
                          }}
                        />
                        <Button type="submit" variant="contained">??????????????????</Button>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseComment}>??????????</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </Grid>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <Box>
                {OneEvent.coordinates && <GetAllPoints OneEvent={OneEvent} />}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%' }}>
            <Grid container xs={12} sx={{ margin: '5px', width: '98%' }}>
              {allComments.map((el) => (
                <Grid item xs={6} sx={{ padding: '5px', cursor: 'pointer' }}>
                  <Item sx={{ backgroundColor: 'white', opacity: '0.9' }}>
                    <OneComment key={el.id} oneComment={el} />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
