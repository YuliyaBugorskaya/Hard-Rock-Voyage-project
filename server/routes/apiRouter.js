const express = require('express');
const fileMiddleware = require('../middleware/file');

const { Action, User } = require('../db/models');

const router = express.Router();
// router.get('/allEvents', async (req, res) => {
//   // console.log('allEvents---->');
//   const allEvents = await Action.findAll({ include: User });

//   res.json(allEvents);
// });

router.post('/allEvents', async (req, res) => {
  const { page } = req.body;
  console.log(req.body, 'req.body-----');
  const allEventsArr = [];
  const allEvents = await Action.findAll({ include: User });
  const allEventsLength = allEvents.length;
  for (let i = 0; i < allEventsLength; i += 1) {
    allEventsArr.push(allEvents.splice(0, 5));
  }

  res.json(allEventsArr[page - 1]);
  // console.log(res.json(allEventsArr[page - 1]), '++++++');
});

router.get('/oneEvent/:id', async (req, res) => {
  const oneEvent = await Action.findOne({ where: { id: req.params.id }, include: User });
  console.log(oneEvent);

  res.json(oneEvent);
});

router.post('/addEvent', async (req, res) => {
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

// router.post('/addEvent', fileMiddleware.single('fotoFromVoyage'), async (req, res) => {
//   const {
//     title, description, fullDescription, startDate, finishDate, startPoint, finishPoint,
//   } = req.body;
//   const newEvent = await Action.create({
//     title,
//     description,
//     fullDescription,
//     startDate,
//     finishDate,
//     startPoint,
//     finishPoint,
//     image: req.file.path,
//     statusId: 1,
//     userId: req.session.user?.id || 1,
//     // userId: req.session.user.id,
//   });
//   console.log(newEvent, 'newEvent======>');
//   res.json(newEvent);
// });

router.delete('/deleteEvent/:id', async (req, res) => {
  const deleteEvent = await Action.destroy({ where: { id: req.params.id }, include: User });
  res.sendStatus(200);
});

router.post('/archiveEvents', async (req, res) => {
  const { page } = req.body;
  const archiveEventsArr = [];
  const allArchiveEvents = await Action.findAll({ where: { statusId: '2' } });
  const allArchiveEventsLength = allArchiveEvents.length;
  for (let i = 0; i < allArchiveEventsLength; i += 1) {
    archiveEventsArr.push(allArchiveEvents.splice(0, 5));
  }
  res.json(archiveEventsArr[page - 1]);
});

module.exports = router;
