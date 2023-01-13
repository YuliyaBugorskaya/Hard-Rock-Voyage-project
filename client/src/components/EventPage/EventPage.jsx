import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Divider,
} from '@mui/material';

import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getOneEvent } from '../../redux/YanaSlices/oneEventSlice';
import PointForm from '../Map/PointForm';
import GetAllPoints from '../Map/GetAllPoints';

export default function EventPage() {
  const [input, setInput] = useState('');
  const [img, setImg] = useState(null);
  const [foto, setFoto] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const user = useSelector((state) => state.user);

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeHandler = (e) => {
    setInput(e.target.value);
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
        console.log(res.data);
      })

      .then(() => setOpen(false));
  };

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, [id]);
  console.log(OneEvent);

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
              }}
            >
              <Typography component="div" sx={{ fontSize: '50px', marginBottom: '10px' }}>
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
                Организатор:
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

              {OneEvent.userId !== user.id && OneEvent.statusId === 1 ? (
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
                    Подать заявку на поездку
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Регистрация на событие</DialogTitle>
                    <form onSubmit={submitHandler}>
                      <DialogContent>
                        <DialogContentText>
                          Напишите, почему вы хотите зарегистрироваться на это событие.
                        </DialogContentText>
                        <TextareaAutosize
                          name="message"
                          type="text"
                          variant="standard"
                          autoFocus
                          aria-label="minimum height"
                          minRows={3}
                          placeholder="Minimum 3 rows"
                          value={input}
                          onChange={inputHandler}
                          style={{ width: '-webkit-fill-available', marginTop: '10px' }}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button type="submit" onClick={handleClose}>Отправить</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </Grid>
              ) : (
                <>
                </>
              )}

              {OneEvent.statusId === 1
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
                      Оставить комментарий
                    </Button>

                    <Dialog open={comment} onClose={handleCloseComment}>
                      <DialogTitle>Поделись впечатлениями</DialogTitle>
                      <form onSubmit={submitHandlerComments}>
                        <DialogContent>
                          <DialogContentText>
                            Оставьте комментарий и фото
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
                            onChange={inputHandler}
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
                            Добавь фото к событию
                          </Typography>
                          <input
                            name="fotoFromVoyage"
                            type="file"
                            onChange={(e) => {
                              setImg(e.target.files[0]);
                              console.log(e.target.files[0], 'e.target.files[0]--------->');
                            }}
                          />
                          <Button type="submit" variant="contained">Отправить</Button>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseComment}>Выйти</Button>
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
              {OneEvent.userId === user.id
                ? (
                  <Box>
                    <PointForm OneEvent={OneEvent} />
                  </Box>
                )
                : (
                  <Box>
                    <GetAllPoints OneEvent={OneEvent} />
                  </Box>
                )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
