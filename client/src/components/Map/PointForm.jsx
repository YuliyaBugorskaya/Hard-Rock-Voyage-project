/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState } from 'react';
// import { Form, Col, Row } from 'reactstrap';
import {
  // eslint-disable-next-line no-unused-vars
  Button, DialogActions, FormControl, TextareaAutosize, TextField, Typography, Box, Grid,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PointForm({ OneEvent }) {
  const [counter, setCounter] = useState(0);
  // const [coordinates, setCoordinates] = useState([]);
  const [img, setImg] = useState(null);
  const [input, setInput] = useState({
    titlePoint: '',
    description: '',
  });
  const [foto, setFoto] = useState(null);

  const { id } = useParams();

  const submitHandlerComments = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('fotoPoint', img);
    data.append('actionId', id);
    data.append('titlePoint', input.titlePoint);
    data.append('description', input.description);
    axios.post('/map/addPoint', data, {
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
      .then(() => setCounter(0))
      .then(() => setImg(null));
  };

  const handleCloseComment = () => {
    setComment(false);
  };

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   // const coordinatesJSON = JSON.stringify(coordinates);
  //   const data = new FormData();
  //   // data.append('coordinates', coordinatesJSON);
  //   data.append('image', img);
  //   data.append('titlePoint', input.titlePoint);
  //   data.append('description', input.description);
  //   data.append('actionId', id);
  //   await axios.post('/map/addPoint', data, {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //     },
  //   })
  //     .then((res) => (res.data));
  //   setInput({});
  // };
  // const [coordinates, setCoordinates] = useState([]);
  React.useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    ymaps.ready(init);
    function init() {
      // eslint-disable-next-line no-unused-vars
      const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 4,
        controls: [],
      }, {
        minZoom: 1,
      });

      let switcher = 0;

      const balloonLayout = ymaps.templateLayoutFactory.createClass("<div class='my-balloon'>"
        + `
        <a href='#' class='close'>X</a>
        <p id="count" color:'white'></p> 
        <button id="button" type="button">?????????? ???? ????????</button>
      `, {

        build() {
          balloonLayout.superclass.build.call(this);
          this._$element = $('.my-balloon', this.getParentElement());
          this._$element.find('.close')
            .on('click', $.proxy(this.onCloseClick, this));
          $('#button').bind('click', this.onCounterClick);
          $('#count').html(switcher);
        },

        onCloseClick(e) {
          e.preventDefault();
          this.events.fire('userclose');
        },

        onCounterClick() {
          if (switcher === 0) {
            $('#count').html(switcher += 1);
            setCounter(switcher);
          } else {
            $('#count').html(switcher -= 1);
            setCounter(switcher);
          }
        },
      });
      console.log(counter, 'sddddddddddddddddddddddd');

      const multiRoute = new ymaps.multiRouter.MultiRoute({
        // ?????????? ????????????????. ?????????? ?????????? ???????? ???????????? ?????? ????????????????????????, ?????? ?? ??????????????.
        referencePoints: [
          ...JSON.parse(OneEvent.coordinates),
        ],
      }, {
        // ?????????????????????????? ?????????????????????????? ?????????????? ?????????? ??????,
        // ?????????? ?????????????? ?????? ?????????? ??????????????.
        boundsAutoApply: true,
        balloonLayout,
        // ?????????????????? ?????????? ???????????? ?????? ????????????.
        balloonPanelMaxMapArea: 1,
      });

      myMap.geoObjects.add(multiRoute);

      multiRoute.model.events.add('requestsuccess', () => {
        // ?????????????????? ?????????????? ?????????? ????????????????.
        const wayPoints = multiRoute.getWayPoints();
        // console.log('=================', wayPoints);
        // ???????????? ???? ?????????????????? ?????????????? ??????????.
        // ?????? ???????????? ?????????? ?????????????? ???????????????????? ??????????.
        const arrPoints = [];
        wayPoints.each((point) => {
          // eslint-disable-next-line no-underscore-dangle
          // ???????????????????? ?????????? ???????????????? point.geometry._coordinatesarrPoints.push(point.geometry._coordinates);
          arrPoints.push(point.geometry._coordinates);
          point.options.set({
            // iconContentLayout: ymaps.templateLayoutFactory.createClass('{{ properties.request|raw }}'),
          });
        });
        setCoordinates(arrPoints);
      });
    }
  }, []);
  return (
    <Box sx={{
      flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}
    >
      <div>
        <div
          id="map"
          style={{
            width: '99%', height: '500px', margin: '10px 0 10px 0',
          }}
        />
        <div>
          <Box
            component="form"
            onSubmit={submitHandlerComments}
            sx={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '20px',
              marginY: '20px',
            }}
          >
            ???????????????? ?????????????????????? ?? ????????
            <TextField
              name="titlePoint"
              type="text"
              variant="standard"
              aria-label="minimum height"
              minRows={3}
              placeholder="Minimum 3 rows"
              value={input.titlePoint}
              onChange={inputHandler}
              style={{ width: '-webkit-fill-available', marginTop: '10px' }}
            />
            <TextField
              name="description"
              type="text"
              variant="standard"
              aria-label="minimum height"
              minRows={3}
              placeholder="Minimum 3 rows"
              value={input.description}
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
            <Typography variant="h10" component="h5" sx={{ flexGrow: 1, marginY: '10px' }}>
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
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#222c3c' }}>??????????????????</Button>
            <Button onClick={handleCloseComment} sx={{ marginX: '10px' }}>??????????</Button>
          </Box>
        </div>
      </div>
    </Box>
  );
}

// <Row className="formRow">
//   <Col className="formCol">
//     <Form onSubmit={submitHandler}>
//       <FormControl
//         sx={{
//           '& .MuiTextField-root': { m: 0.4, width: '55ch' },
//         }}
//       >
//         <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//           ???????????????? ??????????????????
//         </Typography>
//         <TextField
//           name="titlePoint"
//           requiredconst [input, setInput] = useState({ text: '' });
//           onChange={inputHandler}
//         />
//         <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//           ?????????????? ???????? ??????????????????
//         </Typography>
//         <TextField
//           name="description"
//           required
//           id="outlined-required"
//           label="Title"
//           type="text"
//           value={input.title || ''}
//           onChange={inputHandler}
//         />
//         {/* <TextField
//           required
//           name="image"
//           id="outlined-input"
//           label="image"
//           type="text"
//           value={input.image || ''}
//           onChange={inputHandler}
//         /> */}
//         <Typography variant="h10" component="h5" sx={{ flexGrow: 1 }}>
//           ???????????? ???????? ?????????????????? ?????????? ??????????????
//         </Typography>
//         <input
//           name="fotoFromVoyage"
//           type="file"
//           onChange={(e) => {
//             setImg(e.target.files[0]);
//             console.log(e.target.files[0], 'e.target.files[0]--------->');
//           }}
//         />
//         <Button type="submit" variant="contained" style={{ marginBottom: '10px' }}>?????????????? ??????????????????</Button>
//       </FormControl>
//     </Form>
//   </Col>
// </Row>
// 'searchControl', 'typeSelector'
