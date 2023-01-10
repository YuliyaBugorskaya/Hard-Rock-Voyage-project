const express = require('express');
const { Comment } = require('../db/models');

const router = express.Router();

router.post('/addComment', async (req, res) => {
  const { text } = req.body;
  console.log('req.body', req.body);
  const comment = await Comment.create({ text, userId: 1, actionId: 4 });
  res.json(comment);
});

module.exports = router;
