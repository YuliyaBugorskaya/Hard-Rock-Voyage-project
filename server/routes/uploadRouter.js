const express = require('express');
const fileMiddleware = require('../middleware/file');
const { Action } = require('../db/models');

const router = express.Router();

router.post('/avatar', fileMiddleware.single('avatar'), (req, res) => {
  try {
    console.log(req.file);
    if (req.file) {
      console.log(req.file, 'req.file==========>>>');
      res.json(req.file);
    }
  } catch (error) {
    console.log('error');
  }
});

router.post('/foto', fileMiddleware.single('fotoFromVoyage'), (req, res) => {
  try {
    if (req.file) {
      res.json(req.file);
    }
  } catch (error) {
    console.log('error');
  }
});
module.exports = router;
