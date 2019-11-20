/** 
 * sorts by 'release_date' desc
 * ---------------------------------*/

const MovieModel = require('../models/Movie');

const moviesLatestController = (req, res) => {

  MovieModel.find(req.filter).sort('-release_date') // desc
    .then(items => res.status(200).json(items))
    .catch(err => {
      res.status(500).json({ message: `movies error: ${err}` });
      console.log(err)
    });
};

module.exports = moviesLatestController;
