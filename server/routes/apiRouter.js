const express = require('express');
const fileMiddleware = require('../middleware/file');

const {
  Action, User, Comment, Anket, Status,
} = require('../db/models');

const router = express.Router();

router.post('/allEvents', async (req, res) => {
  const size = 2;
  const { page, input } = req.body;
  try {
    let allEvents;
    const allDates = await Action.findAll({
      attributes: ['startDate'],
    });
    if (input) {
      allEvents = await Action.findAndCountAll({
        where: { startDate: input },
        limit: size,
        offset: null,
        include: User,
      });
    } else {
      allEvents = await Action.findAndCountAll({
        include: User,
        limit: size,
        offset: Number(page) - 1,
        order: [['startDate', 'DESC']],
      });
    }
    res.json({
      content: allEvents.rows,
      allDates,
      totalPages: Math.round(allEvents.count / size),
    });
  } catch (error) {
    console.log(error);
  }
});

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

router.post('/addEvent', fileMiddleware.single('fotoFromVoyage'), async (req, res) => {
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
  try {
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
      statusId: 4,
      userId: req.session.user?.id || 1,
    });
    res.json(newEvent);
  } catch (error) {
    console.log(error);
  }
});

router.post('/archiveEvents', async (req, res) => {
  const size = 2;
  const { page, input } = req.body;
  try {
    let archiveEventsArr;
    const allArchiveDates = await Action.findAll({
      where: { statusId: '6' },
      attributes: ['startDate'],
    });
    if (input) {
      archiveEventsArr = await Action.findAndCountAll({
        where: { startDate: input },
        limit: size,
        offset: null,

      });
    } else {
      archiveEventsArr = await Action.findAndCountAll({
        where: { statusId: '6' },
        include: User,
        limit: size,
        offset: Number(page) - 1,
        order: [['startDate', 'DESC']],
      });
    }
    res.json({
      content: archiveEventsArr.rows,
      allArchiveDates,
      totalPages: Math.round(archiveEventsArr.count / size),
    });
  } catch (error) {
    console.log(error);
  }
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

router.post('/addComments', fileMiddleware.single('fotoComment'), async (req, res) => {
  const { text, actionId } = req.body;
  try {
    const newComment = await Comment.create({
      text,
      actionId,
      image: req.file?.path,
      userId: req.session.user?.id || 1,
    });
    res.json({ path: req.file.path });
  } catch (error) {
    console.log(error);
  }
});

router.get('/alleventsmainpage', async (req, res) => {
  try {
    const allEvents = await Action.findAll({ include: User, Status, order: [['startDate', 'ASC']] });
    const removed = allEvents.splice(0, 4);
    res.json(removed);
  } catch (error) {
    console.log(error);
  }
});

router.get('/allankets', async (req, res) => {
  try {
    const allAnkets = await Anket.findAll({ order: [['id', 'DESC']], include: User });
    return res.json(allAnkets);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.patch('/anket/yes', async (req, res) => {
  try {
    const { statusId } = req.body;
    const { userId } = req.body;
    const { id } = req.body;
    await Anket.update({ statusId: statusId + 2 }, { where: { id } });
    for (const [, wsClient] of res.app.locals.ws) {
      if (wsClient.user.id === userId) {
        wsClient.ws.send(JSON.stringify(
          { type: 'PUSH_SEND_YES', payload: { userId } },
        ));
      }
    }
    const updatedYes = await Anket.findOne({ where: { id } });
    return res.json(updatedYes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.patch('/anket/no', async (req, res) => {
  try {
    const { statusId } = req.body;
    const { id } = req.body;
    const { userId } = req.body;
    await Anket.update({ statusId: statusId + 1 }, { where: { id } });
    const updatedNo = await Anket.findOne({ where: { id } });
    for (const [, wsClient] of res.app.locals.ws) {
      if (wsClient.user.id === userId) {
        wsClient.ws.send(JSON.stringify(
          { type: 'PUSH_SEND_NO', payload: { userId } },
        ));
      }
    }
    return res.json(updatedNo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
