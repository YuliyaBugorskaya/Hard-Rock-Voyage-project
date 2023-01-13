import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, FormControl, TextField, Typography,
} from '@mui/material';
import {
  Row, Col, Container,
} from 'reactstrap';
import { updateAvatar, updateUser } from '../../redux/EugeneSlices/userSlice';

export default function Profile() {
  const [input, setInput] = useState({});
  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/myprofile/')
      .then((response) => {
        console.log(response.data, 'response.data');
        setInput({ name: response.data.name, email: response.data.email, password: response.data.password });
      });
  }, []);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(Object.fromEntries(new FormData(e.target))));
    navigate('/lk');
  };

  const sendFile = useCallback(async () => {
    try {
      const data = new FormData();
      data.append('avatar', img);
      await axios.post('/upload/avatar', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then((res) => {
          setAvatar(res.data.path);
          dispatch(updateAvatar((res.data.path)));
        });
    } catch (error) { console.log(error); }
    } catch (error) { console.log(error); }
  }, [img]);
  return (

    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Container style={{
        marginTop: '50px',
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '10px',
      }}
      >
        <Row className="formRow">
          <Col className="formCol">
            <div
              className="avatar"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid',
                backgroundColor: 'black',
              }}
            >
              {
    avatar
      ? (
        <img
          className="logo"
          src={`${avatar}`}
          alt="avatar"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      )
      : (
        <img
          className="logo"
          src={`http://localhost:3001/${user.image}` || '/css/images/avatar-scaled.jpeg'}
          alt="avatar"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      )
  }

            </div>
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            <button
              type="submit"
              style={{ marginTop: '10px' }}
              className="btn"
              onClick={sendFile}
            >
              Добавить фото

            </button>

            <Box
              component="form"
              sx={{
                m: 1,
                width: '80%',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '20px',
                marginY: '30px',
              }}
              display="flex"
              autoComplete="off"
              alignItems="center"
              justifyContent="center"
              onSubmit={submitHandler}
            >
              <FormControl sx={{ gap: '10px' }}>
                <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                  Редактирование профиля
                </Typography>

                <TextField
                  name="name"
                  //   required
                  id="outlined-required-name"
                  type="text"
                  value={input.name}
                  onChange={inputHandler}
                />
                <TextField
                  name="about"
                  //   required
                  id="outlined-required-name"
                  type="text"
                  value={input.about}
                  onChange={inputHandler}
                />
                <TextField
                  name="email"
                  //   required
                  id="outlined-required-email"
                  type="email"
                  value={input.email}
                  onChange={inputHandler}
                />
                <TextField
                  //   required
                  name="password"
                  id="outlined-password-input"
                  //   label="Password"
                  type="password"
                  value={input.password}
                  onChange={inputHandler}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: '#222c3c' }}
                >
                  Готово

                </Button>
              </FormControl>
            </Box>
          </Col>
        </Row>
      </Container>
    </Box>
  );
}
