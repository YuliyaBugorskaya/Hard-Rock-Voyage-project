const express = require('express');
const { Anket } = require('../db/models');

const router = express.Router();

router.post('/addComment/:id', async (req, res) => {
  const { message } = req.body;
  console.log('req.body', req.body);
  console.log('req.session.user', req.session.user);
  console.log('req.params', req.params);
  console.log(message);

  const comment = await Anket.create({
    message, actionId: req.params.id, userId: req.session.user.id, statusId: 1,
  });
  res.json(comment);
});

module.exports = router;
