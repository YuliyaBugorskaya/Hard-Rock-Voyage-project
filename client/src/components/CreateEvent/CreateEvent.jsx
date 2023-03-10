import React, { useState } from 'react';
import {
  Row, Col, Form, Container,
} from 'reactstrap';
import {
  Button, FormControl, TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddPointMap from '../Map/AddPointMap';

export default function CreateEvent() {
  const [coordinates, setCoordinates] = useState([]);
  const [img, setImg] = useState(null);
  const [input, setInput] = useState({
    title: '',
    description: '',
    fulldescription: '',
    startDate: '',
    finishDate: '',
    startPoint: '',
    finishPoint: '',
  });

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const coordinatesJSON = JSON.stringify(coordinates);
    const data = new FormData();
    data.append('coordinates', coordinatesJSON);
    data.append('fotoFromVoyage', img);
    data.append('title', input.title);
    data.append('description', input.description);
    data.append('fulldescription', input.fulldescription);
    data.append('startDate', input.startDate);
    data.append('finishDate', input.finishDate);
    data.append('startPoint', input.startPoint);
    data.append('finishPoint', input.finishPoint);
    await axios.post('/api/addEvent', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then((res) => (res.data));
    setInput({});
    navigate('/lk');
  };
  React.useEffect(() => { console.log(coordinates); }, [coordinates]);

  return (
    <Container style={{
      display: 'flex',
      justifyContent: 'center',
      backgroundImage: `url(${'../css/images/_7Fr1kwBRRM.jpeg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
    >
      <Row className="formRow">
        <Col className="formCol">
          <Form onSubmit={submitHandler}>
            <FormControl
              sx={{
                m: 0.4, width: '55ch', backgroundColor: 'white', padding: '20px', borderRadius: '20px', marginY: '40px', gap: '10px',
              }}
            >
              <Typography variant="h6" component="h2" sx={{ flexGrow: 1, marginY: '10px', textAlign: 'center' }}>
                ???????????? ???????? ??????????????
              </Typography>
              <TextField
                name="title"
                required
                id="outlined-required"
                label="???????????????? ??????????????"
                type="text"
                value={input.title || ''}
                onChange={inputHandler}
              />
              <TextField
                name="description"
                required
                id="outlined-required"
                label="???????????????? ????????????????"
                type="text"
                value={input.description || ''}
                onChange={inputHandler}
              />
              <TextField
                name="fulldescription"
                id="outlined-input"
                label="???????????? ????????????????"
                type="text"
                value={input.fulldescription || ''}
                onChange={inputHandler}
              />
              <Typography variant="h10" component="h5" sx={{ flexGrow: 1, marginY: '10px' }}>
                ???????? ???????????? ??????????????
              </Typography>
              <TextField
                required
                name="startDate"
                id="outlined-input"
                type="date"
                value={input.startDate || ''}
                onChange={inputHandler}
              />
              <Typography variant="h10" component="h5" sx={{ flexGrow: 1, marginY: '10px' }}>
                ???????? ???????????????????? ??????????????
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
                label="?????????? ????????????"
                type="text"
                value={input.startPoint || ''}
                onChange={inputHandler}
              />
              <TextField
                required
                name="finishPoint"
                id="outlined-input"
                label="?????????? ????????????"
                type="text"
                value={input.finishPoint || ''}
                onChange={inputHandler}
              />
              <Typography variant="h10" component="h5" sx={{ flexGrow: 1 }}>
                ???????????? ???????? ?? ??????????????
              </Typography>
              <input
                name="fotoFromVoyage"
                type="file"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                  console.log(e.target.files[0], 'e.target.files[0]--------->');
                }}
              />
              <Typography variant="h10" component="h5" sx={{ flexGrow: 1 }}>
                ?????????????????? ?????? ??????????????
              </Typography>
              <AddPointMap setCoordinates={setCoordinates} />
              <Button type="submit" variant="contained" style={{ marginBottom: '10px', backgroundColor: '#222c3c' }}>?????????????? ??????????????</Button>
            </FormControl>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
