import React, { useCallback, useState } from 'react';
import {
  Row, Col, Form, Container,
} from 'reactstrap';
import {
  Button, FormControl, TextField, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { submitEvent } from '../../redux/YuliyaSlices/allEventsSlice';
// import eventFoto from '`url(${'../css/images/_7Fr1kwBRRM.jpeg'})`';

export default function CreateEvent() {
  // стейт для текущего события и тейт для картинки, которую загружаем из инпута
  const [img, setImg] = useState(null);
  const [fotoFromVoyage, setFotoFromVoyage] = useState(null);
  const [input, setInput] = useState({
    title: '',
    description: '',
    fullDescription: '',
    startDate: '',
    finishDate: '',
    startPoint: '',
    finishPoint: '',
    image: '',
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(submitEvent(input));
    setInput({});
    navigate('/lk');
  };

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('fotoFromVoyage', img);
      await axios.post('/upload/foto', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        // .then((res) => console.log(res.data.path));
        .then((res) => setFotoFromVoyage(res.data.path));
      // console.log(res.data.path, '=========>>>');
    } catch (error) {}
  }, [img]);

  return (
    <div>
      <Container style={{
        marginLeft: '400px',
        display: 'flex',
      }}
      >
        <Row className="formRow">
          <Col className="formCol">
            <Form onSubmit={submitHandler}>
              <FormControl
                sx={{
                  '& .MuiTextField-root': { m: 0.4, width: '55ch' },
                }}
              >
                <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                  Создай свое событие
                </Typography>
                <TextField
                  name="title"
                  required
                  id="outlined-required"
                  label="Title"
                  type="text"
                  value={input.title || ''}
                  onChange={inputHandler}
                />
                <TextField
                  name="description"
                  required
                  id="outlined-required"
                  label="Short Description"
                  type="text"
                  value={input.description || ''}
                  onChange={inputHandler}
                />
                <TextField
                  required
                  name="fullDescription"
                  id="outlined-input"
                  label="Full Description"
                  type="text"
                  value={input.fullDescription || ''}
                  onChange={inputHandler}
                />
                <Typography variant="h10" component="h5" sx={{ flexGrow: 1 }}>
                  Дата старта поездки
                </Typography>
                <TextField
                  required
                  name="startDate"
                  id="outlined-input"
                  type="date"
                  value={input.startDate || ''}
                  onChange={inputHandler}
                />
                <Typography variant="h10" component="h5" sx={{ flexGrow: 1 }}>
                  Дата завершения поездки
                </Typography>
                <TextField
                  required
                  name="finishDate"
                  id="outlined-input"
                  type="date"
                  value={input.finishDate || ''}
                  onChange={inputHandler}
                />
                <TextField
                  required
                  name="startPoint"
                  id="outlined-input"
                  label="Start Point"
                  type="text"
                  value={input.startPoint || ''}
                  onChange={inputHandler}
                />
                <TextField
                  required
                  name="finishPoint"
                  id="outlined-input"
                  label="Finish Point"
                  type="text"
                  value={input.finishPoint || ''}
                  onChange={inputHandler}
                />
                {/* <TextField
                  required
                  name="image"
                  id="outlined-input"
                  label="image"
                  type="text"
                  value={input.image || ''}
                  onChange={inputHandler}
                /> */}
                {/* <Button style={{ marginBottom: '20px' }} variant="contained">Загрузить фото</Button> */}
                <Typography variant="h10" component="h5" sx={{ flexGrow: 1 }}>
                  Добавь фото к событию
                </Typography>
                <input type="file" onChange={(e) => setImg(e.target.files[0])} />
                <Button type="submit" variant="contained">Создать событие</Button>
              </FormControl>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="fotoFromVoyage">
        {
          fotoFromVoyage
            ? <img className="logo" src={`${fotoFromVoyage}`} alt="fotoFromVoyage" />
            : <img className="logo" src="/css/images/_7Fr1kwBRRM.jpeg" alt="fotoFromVoyage" />
        }

      </div>
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button type="submit" className="btn" onClick={sendFile}>Добавить фото</button>
    </div>
  );
}

/* <Box
component="form"
sx={{
  '& .MuiTextField-root': { m: 0.4, width: '55ch' },
}}
display="flex"
noValidate
autoComplete="off"
alignItems="center"
justifyContent="center"
minHeight="80vh"
>
<Form onSubmit={submitHandler}>
  <FormControl>
    <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
      Создай свое событие
    </Typography>
    <TextField
      name="title"
      required
      id="outlined-required"
      label="Title"
      type="text"
      value={input.title || ''}
      onChange={inputHandler}
    />
    <TextField
      name="description"
      required
      id="outlined-required"
      label="Short Description"
      type="text"
      value={input.description || ''}
      onChange={inputHandler}
    />
    <TextField
      required
      name="fullDescription"
      id="outlined-input"
      label="Full Description"
      type="text"
      value={input.fullDescription || ''}
      onChange={inputHandler}
    />
    <Typography variant="h10" component="h5" sx={{ flexGrow: 1 }}>
      Дата старта поездки
    </Typography>
    <TextField
      required
      name="startDate"
      id="outlined-input"
      // label="Start Date"
      type="date"
      value={input.startDate || ''}
      onChange={inputHandler}
    />
    <Typography variant="h10" component="h5" sx={{ flexGrow: 1 }}>
      Дата завершения поездки
    </Typography>
    <TextField
      required
      name="finishDate"
      id="outlined-input"
      // label="Finish Date"
      type="date"
      value={input.finishDate || ''}
      onChange={inputHandler}
    />
    <TextField
      required
      name="startPoint"
      id="outlined-input"
      label="Start Point"
      type="text"
      value={input.startPoint || ''}
      onChange={inputHandler}
    />
    <TextField
      required
      name="finishPoint"
      id="outlined-input"
      label="Finish Point"
      type="text"
      value={input.finishPoint || ''}
      onChange={inputHandler}
    />
    <TextField
      required
      name="image"
      id="outlined-input"
      label="image"
      type="text"
      value={input.image || ''}
      onChange={inputHandler}
    />
    <Button style={{ marginBottom: '20px' }} variant="contained">Загрузить фото</Button>

  </FormControl>
  <Button type="submit" variant="contained">Создать событие</Button>
</Form>

</Box>
);
} */
