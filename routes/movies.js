const express = require('express');
const router = express.Router();

const MovieModel = require('../models/Movie');

router.get('/', (req, res) => {
  MovieModel.find({})
  .then((movie) => {
    res.send(movie);
  })
});

module.exports = router;
