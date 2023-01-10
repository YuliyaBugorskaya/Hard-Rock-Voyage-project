const express = require('express');

const {
  Action, User, Members,
} = require('../db/models');

const router = express.Router();
router.get('/allevents', async (req, res) => {
  const allEvents = await Action.findAll({ include: User });
  res.json(allEvents);
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

module.exports = router;
