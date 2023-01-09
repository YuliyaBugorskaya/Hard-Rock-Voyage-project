const express = require('express');
const { User } = require('../db/models');

const router = express.Router();
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body.inputs;
  console.log({ name, email, password });
  if (name && email && password) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { name, password },
      });
      if (created) {
        const sessionUser = JSON.parse(JSON.stringify(user));
        delete sessionUser.password;
        req.session.user = sessionUser;
        return res.json(sessionUser);
      }
      return res.sendStatus(401);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body.inputs;
  if (email && password) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (user.password === password) {
        const sessionUser = JSON.parse(JSON.stringify(user));
        delete sessionUser.password;
        req.session.user = sessionUser;
        return res.json(sessionUser);
      }
      return res.sendStatus(401);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});
router.post('/check', (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid').sendStatus(200);
});

module.exports = router;
