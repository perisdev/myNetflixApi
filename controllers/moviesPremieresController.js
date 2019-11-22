/** 
 * responds with premieres (movies type 1).
 * 
 * accepts filter by 'genre' or 'title'.
 * ------------------------------------------*/

const MovieModel = require('../models/Movie');

const moviesPremieresController = (req, res, next) => {

  req.filter.type = 1;

  MovieModel.find(req.filter)
    .then(items => (items[0])? res.status(200).json(items):next())
    .catch(err => {
      res.status(500).json({ message: `premieres movies error: ${err}` });
    });
};

module.exports = moviesPremieresController;
