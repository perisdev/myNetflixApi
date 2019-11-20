/** 
 * sorts by 'popularity' desc
 * ---------------------------------*/

const MovieModel = require('../models/Movie');

const moviesPopularController = (req, res) => {

  MovieModel.find(req.filter).sort('-popularity') // desc
    .then(items => res.status(200).json(items))
    .catch(err => {
      res.status(500).json({ message: `movies error: ${err}` });
      console.log(err)
    });
};

module.exports = moviesPopularController;
