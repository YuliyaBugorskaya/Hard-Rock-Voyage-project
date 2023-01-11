import axios from 'axios';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, FormControl, TextField, Typography,
} from '@mui/material';
import {
  Row, Col, Form, Container,
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
    } catch (error) {}
  }, [img]);
  return (

    <div>
      <Container style={{
        marginLeft: '400px',
        marginTop: '50px',
        display: 'flex',
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
        //   src="/css/images/avatar-scaled.jpeg"
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
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              display="flex"
              autoComplete="off"
              alignItems="center"
              justifyContent="center"
              minHeight="80vh"
              onSubmit={submitHandler}
            >
              <FormControl>
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
                >
                  Готово

                </Button>
              </FormControl>
            </Box>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

// import axios from 'axios';
// import React, { useCallback, useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//   Box, Button, FormControl, TextField, Typography,
// } from '@mui/material';
// import { signupUser } from '../../redux/EugeneSlices/userSlice';

// export default function Profile() {
//   const [input, setInput] = useState({});
//   const [profile, setProfile] = useState({});
//   const [img, setImg] = useState(null);
//   const [avatar, setAvatar] = useState(null);

//   useEffect(() => {
//     axios.get('/api/myprofile/')
//       .then((response) => {
//         console.log(response.data, 'response.data');
//         setInput({ name: response.data.name, email: response.data.email });
//       });
//   }, []);

//   const inputHandler = (e) => {
//     setInput(e.target.value);
//   };
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(signupUser(Object.fromEntries(new FormData(e.target))));
//     navigate('/');
//   };

//   const sendFile = useCallback(async () => {
//     console.log('ya zdes--');
//     try {
//       const data = new FormData();
//       data.append('avatar', img);
//       await axios.post('/upload/avatar', data, {
//         headers: {
//           'content-type': 'multipart/form-data',
//         },
//       })
//         // .then((res) => console.log(res.data));
//         .then((res) => setAvatar(res.data.path));
//     } catch (error) {}
//   }, [img]);
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       display="flex"
//       autoComplete="off"
//       alignItems="center"
//       justifyContent="center"
//       minHeight="80vh"
//       onSubmit={submitHandler}
//     >
//       <FormControl>
//         <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//           Редактирование профиля
//         </Typography>
//         <div>

//           <div
//             className="avatar"
//             style={{
//               width: '150px',
//               height: '150px',
//               borderRadius: '50px',
//               overflow: 'hidden',
//               border: '1px solid',
//             }}
//           >
//             {
//           avatar
//             ? (
//               <img
//                 className="logo"
//                 src={`${avatar}`}
//                 alt="avatar"
//                 style={{
//                   width: '100%',
//                   height: 'auto',
//                 }}
//               />
//             )
//             : (
//               <img
//                 className="logo"
//                 src="/css/images/avatar-scaled.jpeg"
//                 alt="avatar"
//                 style={{
//                   width: '100%',
//                   height: 'auto',
//                 }}
//               />
//             )
//         }

//           </div>
//           <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//           <button type="submit" className="btn" onClick={sendFile}>Добавить фото</button>
//         </div>
//         <TextField
//           name="name"
//           required
//           id="outlined-required-name"
//           type="text"
//           value={input.name}
//           onChange={inputHandler}
//         />
//         <TextField
//           name="email"
//           required
//           id="outlined-required-email"
//           type="email"
//           value={input.email}
//           onChange={inputHandler}
//         />
//         <TextField
//           required
//           name="password"
//           id="outlined-password-input"
//           label="Password"
//           type="password"
//           value={input.password}
//           onChange={inputHandler}
//         />
//         <Button
//           variant="contained"
//           type="submit"
//         >
//           Готово

//         </Button>
//       </FormControl>
//     </Box>
//   );
// }
