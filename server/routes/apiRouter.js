const express = require('express');

const { Action, User } = require('../db/models');

const router = express.Router();
router.get('/allevents', async (req, res) => {
  const allEvents = await Action.findAll({ include: User });
  res.json(allEvents);
});

router.get('/oneEvent/:id', async (req, res) => {
  const oneEvent = await Action.findOne({ where: { id: req.params.id }, include: User });
  console.log(oneEvent);

  res.json(oneEvent);
});

module.exports = router;
