const express = require('express');
const { Anket } = require('../db/models');

const router = express.Router();

router.post('/addComment/:id', async (req, res) => {
  const { message } = req.body;
  try {
    const comment = await Anket.create({
      message, actionId: req.params.id, userId: req.session.user.id, statusId: 1,
    });
    res.json(comment);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
