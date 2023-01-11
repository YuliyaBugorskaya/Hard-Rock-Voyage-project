const express = require('express');
const fileMiddleware = require('../middleware/file');

const {
  Action, User, Members,
} = require('../db/models');

const router = express.Router();

router.post('/allEvents', async (req, res) => {
  // const pageAsNumber = Number.parseInt(req.query.page);
  // const sizeAsNumber = Number.parseInt(req.query.size);
  const size = 2;
  const { page, input } = req.body;
  let allEvents;
  const allDates = await Action.findAll({
    attributes: ['startDate'],
  });
  console.log(req.body, 'req.body++++++1111');
  // console.log(await Action.findAll({ where: { startDate: input } }), 'blabla');
  if (input) {
    console.log('input - ', input);
    allEvents = await Action.findAndCountAll({
      where: { startDate: input },
      limit: size,
      offset: null,
      // offset: page ? Number(page) : 1,

    });
    console.log('res-', JSON.parse(JSON.stringify(allEvents)));
  } else {
    console.log('ya tut', page);
    allEvents = await Action.findAndCountAll({
      include: User,
      limit: size,
      offset: Number(page) - 1,
      order: [['startDate', 'DESC']],
    });
  }
  // console.log(page, Number(page) * size, 'page0000000');
  // console.log(allEvents, 'allEvents+++++++>>>');
  // console.log(JSON.parse(JSON.stringify(allEvents)), '<---------->');
  console.log(JSON.parse(JSON.stringify(allEvents)));
  res.json({
    content: allEvents.rows,
    allDates,
    totalPages: Math.round(allEvents.count / size),
  });

  // console.log(JSON.parse(JSON.stringify(allDates)), '<----------888>');
});

// пагинация v1
// router.post('/allEvents', async (req, res) => {
//   const { page } = req.body;
//   // console.log(req.body, 'req.body-----');
//   const allEventsArr = [];
//   const allEvents = await Action.findAll({ order: [['startDate', 'DESC']], include: User });
//   // { order: [['id', 'DESC']] }
//   // console.log(allEvents, '----allEvents-----');
//   const allEventsLength = allEvents.length;
//   for (let i = 0; i < allEventsLength; i += 1) {
//     allEventsArr.push(allEvents.splice(0, 5));
//   }
//   // console.log((allEventsArr[page - 1]), '++++++');
//   res.json(allEventsArr[page - 1]);
// });

router.get('/oneEvent/:id', async (req, res) => {
  try {
    const oneEvent = await Action.findOne({ where: { id: req.params.id }, include: User });

    return res.json(oneEvent);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/event/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Action.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(401);
  }
});

router.patch('/status/', async (req, res) => {
  const { statusId } = req.body;
  const { id } = req.body;
  try {
    await Action.update({ statusId: statusId + 1 }, { where: { id } });
    const updatedEvent = await Action.findOne({ where: { id } });
    // const updatedEvent = await Action.findOne({ where: { id } });
    // const { statusId } = eventStatus;
    // updatedEvent.map((el) => console.log(el.statusId));
    return res.json(updatedEvent);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/userpage/:id', async (req, res) => {
  try {
    const oneUser = await User.findOne({ where: { id: req.params.id } });
    return res.json(oneUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/userpage', async (req, res) => {
  try {
    const oneLKUser = await User.findOne({ where: { id: req.session.user.id } });
    return res.json(oneLKUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/lk', async (req, res) => {
  try {
    const userLK = await Action.findAll({ where: { userId: req.session.user.id }, include: User });

    return res.json(userLK);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// router.post('/addEvent', async (req, res) => {
//   const {
//     title, description, fullDescription, startDate, finishDate, startPoint, finishPoint, image,
//   } = req.body;
//   const newEvent = await Action.create({
//     title,
//     description,
//     fullDescription,
//     startDate,
//     finishDate,
//     startPoint,
//     finishPoint,
//     image,
//     statusId: 1,
//     userId: req.session.user?.id || 1,
//     // userId: req.session.user.id,
//   });
//   console.log(newEvent, 'newEvent======>');
//   res.json(newEvent);
// });

router.post('/addEvent', fileMiddleware.single('fotoFromVoyage'), async (req, res) => {
  const {
    title, description, fulldescription, startDate, finishDate, startPoint, finishPoint,
  } = req.body;
  // console.log(req, '00000000');
  console.log(req.body, 'req.body--');
  const newEvent = await Action.create({
    title,
    description,
    fulldescription,
    startDate,
    finishDate,
    startPoint,
    finishPoint,
    image: req.file?.path,
    statusId: 1,
    userId: req.session.user?.id || 1,
    // userId: req.session.user.id,
  });
  console.log(JSON.parse(JSON.stringify(newEvent)), 'newEvent======>');
  res.json(newEvent);
});

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

router.get('/myprofile', async (req, res) => {
  try {
    const profileUser = await User.findOne({ where: { id: req.session.user.id } });
    return res.json(profileUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
