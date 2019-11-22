/** 
 * responds with all the movies.
 * 
 * accepts filter by 'id' or 'genre' or 'title'.
 * -----------------------------------------------*/

const MovieModel = require('../models/Movie');

const moviesController = (req, res, next) => {

  MovieModel.find(req.filter)
    .then(items => (items[0])? res.status(200).json(items):next())
    .catch(err => {
      res.status(500).json({ message: `movies error: ${err}` });
    });
};

module.exports = moviesController;
