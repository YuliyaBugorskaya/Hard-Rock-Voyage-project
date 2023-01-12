const express = require('express');
const { MapPoint } = require('../db/models');
const fileMiddleware = require('../middleware/file');

const router = express.Router();

router.get('/allPoints/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // eslint-disable-next-line max-len
    const arr = await MapPoint.findOne({ where: { actionId: id } });
    // const currArr = arr.map((el) => [...[Number(el.latitude), Number(el.longitude)]]);
    res.json(arr);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.post('/add/:id', async (req, res) => {
  console.log('Я на бэке');
  const arr = req.body;
  console.log(req.body);
  const { id } = req.params;
  const coordinatesJSON = JSON.stringify(arr);
  if (req.body.length !== 0) {
    try {
      await MapPoint.create({
        coordinates: coordinatesJSON,
        actionId: id,
      });
      res.json(arr);
    } catch (error) {
      res.sendStatus(400);
    }
  } else {
    console.log('net');
  }
});

router.post('/addPoint/:id', fileMiddleware.single('fotoFromVoyage'), async (req, res) => {
  const {
    title,
    description,
    fulldescription,
    startDate,
    finishDate,
    startPoint,
    finishPoint,
    coordinates,
  } = req.body;
  // const coordinatesJSON = JSON.stringify(coordinates)
  // console.log(req, '00000000');
  console.log(req.body, 'req.body-----------------------');
  const newEvent = await Action.create({
    title,
    description,
    fulldescription,
    startDate,
    finishDate,
    startPoint,
    finishPoint,
    image: req.file?.path,
    coordinates,
    statusId: 1,
    userId: req.session.user?.id || 1,
    // userId: req.session.user.id,
  });
  console.log(JSON.parse(JSON.stringify(newEvent)), 'newEvent======>');
  res.json(newEvent);
});

module.exports = router;
