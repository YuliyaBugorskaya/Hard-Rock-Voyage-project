const express = require('express');
const { MapPoint } = require('../db/models');

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

module.exports = router;
