import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getOneEvent } from '../../redux/YanaSlices/oneEventSlice';
import AddPointMap from '../Map/AddPointMap';
// import { getUserPage } from '../../redux/YanaSlices/userPageSlice';

export default function EventPage() {
  const [input, setInput] = useState({ text: '' });
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

  // const handleClickOpenComment = () => {
  //   setComment(true);
  // };

  const handleCloseComment = () => {
    setComment(false);
  };

  const { id } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const textData = Object.fromEntries(new FormData(e.target));
    console.log(textData);
    axios.post(`comment/addComment/${id}`, textData);
    console.log(input);
    console.log(e.target.value);
  };
  const dispatch = useDispatch();

  const OneEvent = useSelector((state) => state.oneEvent);

  const user = useSelector((state) => state.user);

  const inputHandler = (e) => {
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
        console.log(res.data);
      //   setOpen(false);
      })
      // .then(() => setInput({ text: '' }))
      .then(() => setOpen(false));
  };

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, [id]);
  console.log(OneEvent);

  // const [comment, setComment] = useState(false);

  const handleClickOpenComment = () => {
    setComment(true);
  };

  // const handleCloseComment = () => {
  //   setComment(false);
  // };

  return (
    <>
      <CssBaseline />
      <Container fixed>

        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`http://localhost:3001/${OneEvent?.image}`}
        />
        <Typography component="div">
          {OneEvent.description}
        </Typography>
        <Typography component="div">
          Организатор:
          {' '}
          {/* <Button variant="text" onClick={() => seeUser()}>
            {' '}
            {OneEvent?.User?.name}
          </Button> */}

        </Typography>
        <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`http://localhost:3001/${OneEvent?.User?.image}`}
            alt="Live from space album cover"
          />

          <Typography>
            {OneEvent?.User?.name}
          </Typography>
        </Stack>
        <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          {OneEvent?.User?.about}
        </Container>

        <Typography component="div">
          {OneEvent.title}
        </Typography>
        <Typography component="div">
          {OneEvent.fulldescription}
        </Typography>
        {OneEvent.userId !== user.id && OneEvent.statusId === 4 ? (
          <>
            <Button variant="text" onClick={handleClickOpen}>
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
          </>
        ) : (
          <>
          </>
        )}
        <Typography component="div">
          Тут будут участники
        </Typography>
        {OneEvent.userId === user.id
          && (
            <Box>
              <AddPointMap />
            </Box>
          )}
        {OneEvent.statusId === 6
          && (
            <>
              <Button onClick={handleClickOpenComment} variant="text">
                Оставить комментарий
              </Button>
              <Button variant="text">
                Добавить фотографии в альбом
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
            </>
          )}
      </Container>
    </>
  );
}
