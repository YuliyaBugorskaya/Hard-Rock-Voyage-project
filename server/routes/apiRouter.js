const express = require('express');
const { Action } = require('../db/models');

const router = express.Router();

router.get('/allEvents', async (req, res) => {
  const allEvents = await Action.findAll();
  res.json(allEvents);
});
module.exports = router;
