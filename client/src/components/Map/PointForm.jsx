/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-undef */
import React, { useState } from 'react';
// import { Form, Col, Row } from 'reactstrap';
import {
  // eslint-disable-next-line no-unused-vars
  Button, DialogActions, FormControl, TextareaAutosize, TextField, Typography,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PointForm({ OneEvent }) {
  const [counter, setCounter] = useState(0);
  const [coordinates, setCoordinates] = useState([]);
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
      .then(() => setOpen(false));
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
        '<i id="count"></i> '
        <button id="button" type="button">Нажми на меня</button>
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
        // Точки маршрута. Точки могут быть заданы как координатами, так и адресом.
        referencePoints: [
          ...JSON.parse(OneEvent.coordinates),
        ],
      }, {
        // Автоматически устанавливать границы карты так,
        // чтобы маршрут был виден целиком.
        boundsAutoApply: true,
        balloonLayout,
        // Отключаем режим панели для балуна.
        balloonPanelMaxMapArea: 1,
      });

      myMap.geoObjects.add(multiRoute);

      multiRoute.model.events.add('requestsuccess', () => {
        // Коллекция путевых точек маршрута.
        const wayPoints = multiRoute.getWayPoints();
        // console.log('=================', wayPoints);
        // Проход по коллекции путевых точек.
        // Для каждой точки зададим содержимое меток.
        const arrPoints = [];
        wayPoints.each((point) => {
          // eslint-disable-next-line no-underscore-dangle
          // координаты метки маршрута point.geometry._coordinatesarrPoints.push(point.geometry._coordinates);
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
    <div style={{ display: 'flex' }}>
      <div
        id="map"
        style={{
          width: '900px', height: '800px', margin: '10px 0 10px 0',
        }}
      />
      {counter === 1
        && (
          <div>
            <form onSubmit={submitHandlerComments}>
              Оставьте комментарий и фото
              <TextareaAutosize
                name="titlePoint"
                type="text"
                variant="standard"
                autoFocus
                aria-label="minimum height"
                minRows={3}
                placeholder="Minimum 3 rows"
                value={input.titlePoint}
                onChange={inputHandler}
                style={{ width: '-webkit-fill-available', marginTop: '10px' }}
              />
              <TextareaAutosize
                name="description"
                type="text"
                variant="standard"
                autoFocus
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
              <Button onClick={handleCloseComment}>Выйти</Button>
            </form>
          </div>
        )}
    </div>
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
//           Название остановки
//         </Typography>
//         <TextField
//           name="titlePoint"
//           requiredconst [input, setInput] = useState({ text: '' });
//           onChange={inputHandler}
//         />
//         <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
//           Опишите свою остановку
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
//           Добавь фото остановки своей поездки
//         </Typography>
//         <input
//           name="fotoFromVoyage"
//           type="file"
//           onChange={(e) => {
//             setImg(e.target.files[0]);
//             console.log(e.target.files[0], 'e.target.files[0]--------->');
//           }}
//         />
//         <Button type="submit" variant="contained" style={{ marginBottom: '10px' }}>Описать остановку</Button>
//       </FormControl>
//     </Form>
//   </Col>
// </Row>
// 'searchControl', 'typeSelector'
