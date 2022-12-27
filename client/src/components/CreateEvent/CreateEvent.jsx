import React, { useState } from 'react';
import {
  Row, Col, Form, Container,
} from 'reactstrap';
import {
  Button, FormControl, TextField, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitEvent } from '../../redux/YuliyaSlices/allEventsSlice';

export default function CreateEvent() {
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

                <Button type="submit" variant="contained">Создать событие</Button>
              </FormControl>

            </Form>
          </Col>
        </Row>
      </Container>
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
