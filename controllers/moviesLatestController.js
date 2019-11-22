/** 
 * sorts by 'release_date' desc.
 * 
 * accepts filter by 'genre' or 'title'.
 * ----------------------------------------*/

const MovieModel = require('../models/Movie');

const moviesLatestController = (req, res, next) => {

  MovieModel.find(req.filter).sort('-release_date') // desc
    .then(items => (items[0])? res.status(200).json(items):next())
    .catch(err => {
      res.status(500).json({ message: `movies error: ${err}` });
    });
};

module.exports = moviesLatestController;
