const MovieModel = require('../models/Movie');

const moviesController = (req, res) => {

  MovieModel.find(req.filter)
    .then(items => res.status(200).json(items))
    .catch(err => {
      res.status(500).json({ message: `movies error: ${err}` });
      console.log(err)
    });
};

module.exports = moviesController;
