const express = require('express');

const { Action, User } = require('../db/models');

const router = express.Router();
router.get('/allEvents', async (req, res) => {
  // console.log('allEvents---->');
  const allEvents = await Action.findAll({ include: User });

  res.json(allEvents);
});

router.get('/oneEvent/:id', async (req, res) => {
  const oneEvent = await Action.findOne({ where: { id: req.params.id }, include: User });
  console.log(oneEvent);

  res.json(oneEvent);
});

router.post('/addEvent', async (req, res) => {
  console.log(req.body, '++++++++apialllevents');
  const {
    title, description, fullDescription, startDate, finishDate, startPoint, finishPoint, image,
  } = req.body;
  const newEvent = await Action.create({
    title,
    description,
    fullDescription,
    startDate,
    finishDate,
    startPoint,
    finishPoint,
    image,
    statusId: 1,
    userId: req.session.user?.id || 1,
    // userId: req.session.user.id,
  });
  console.log(newEvent, 'newEvent======>');
  res.json(newEvent);
});

router.delete('/deleteEvent/:id', async (req, res) => {
  const deleteEvent = await Action.destroy({ where: { id: req.params.id } });
  res.sendStatus(200);
});

module.exports = router;
