const MovieModel = require('../models/Movie');

const moviesController = (req, res) => {

  MovieModel.find(req.filter).then(items => {
    res.status(200).json(items);
  });
};

module.exports = moviesController;
