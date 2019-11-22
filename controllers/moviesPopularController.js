/** 
 * sorts by 'popularity' desc.
 * 
 * accepts filter by 'genre' or 'title'.
 * ----------------------------------------*/

const MovieModel = require('../models/Movie');

const moviesPopularController = (req, res, next) => {

  MovieModel.find(req.filter).sort('-popularity') // desc
    .then(items => (items[0])? res.status(200).json(items):next())
    .catch(err => {
      res.status(500).json({ message: `movies error: ${err}` });
    });
};

module.exports = moviesPopularController;
