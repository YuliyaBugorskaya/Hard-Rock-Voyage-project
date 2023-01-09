const express = require('express');

const {
  Action, User, Members, Statuses,
} = require('../db/models');

const router = express.Router();
router.get('/allevents', async (req, res) => {
  const allEvents = await Action.findAll({ include: User });
  res.json(allEvents);
});

router.get('/oneEvent/:id', async (req, res) => {
  const oneEvent = await Action.findOne({ where: { id: req.params.id }, include: User });

  res.json(oneEvent);
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
  await Action.update({ statusId: statusId + 1 }, { where: { id } });
  const updatedEvent = await Action.findOne({ where: { id } });
  // const updatedEvent = await Action.findOne({ where: { id } });
  // const { statusId } = eventStatus;
  // updatedEvent.map((el) => console.log(el.statusId));
  res.json(updatedEvent);
});

router.get('/userpage/:id', async (req, res) => {
  const oneUser = await User.findOne({ where: { id: req.params.id } });
  res.json(oneUser);
});

router.get('/userpage', async (req, res) => {
  const oneLKUser = await User.findOne({ where: { id: req.session.user.id } });
  res.json(oneLKUser);
});

router.get('/lk', async (req, res) => {
  const userLK = await Action.findAll({ where: { userId: req.session.user.id }, include: User });

  res.json(userLK);
});
// router.get('/statuses', async (req, res) => {
//   const allStatuses = await Statuses.findAll();
//   res.json(allStatuses);
// });

module.exports = router;
