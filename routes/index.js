/* eslint-disable no-unused-vars */

const express = require('express');

const router = express.Router();


router.get('/', async (req, res, next) => {
  res.json([{

    title: 'Welcome!',
    session: req.session,
  }]);
});


module.exports = router;
