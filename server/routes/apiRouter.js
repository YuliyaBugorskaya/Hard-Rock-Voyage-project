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

router.get('/userpage/:id', async (req, res) => {
  const oneUser = await User.findOne({ where: { id: req.params.id } });
  res.json(oneUser);
});

router.get('/lk', async (req, res) => {
  const userLK = await Action.findOne({ where: { userId: req.session.id }, include: User });

  res.json(userLK);
});
router.get('/statuses', async (req, res) => {
  const allStatuses = await Statuses.findAll();
  res.json(allStatuses);
});

module.exports = router;
