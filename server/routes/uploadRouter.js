const express = require('express');
const fileMiddleware = require('../middleware/file');
const { User } = require('../db/models');

const router = express.Router();

router.post('/avatar', fileMiddleware.single('avatar'), async (req, res) => {
  try {
    const imgAvatar = await User.update(
      { image: req.file?.path },
      { where: { id: req.session.user.id } },
    );
    req.session.user = { ...req.session.user, image: req.file?.path };
    res.json({ path: `${req.file.path}` });
    if (req.file) {
      res.json({ path: `${req.file.path}` });
    }
  } catch (error) {
    console.log('error');
  }
});

module.exports = router;
