/** 
 * sorts by 'popularity' desc
 * ---------------------------------*/

const MovieModel = require('../models/Movie');

const moviesPopularController = (req, res) => {

  MovieModel.find(req.filter).sort('-popularity') // desc
    .then(items => res.status(200).json(items));
};

module.exports = moviesPopularController;
