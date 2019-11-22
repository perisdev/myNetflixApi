/** 
 * responds with all generes collection.
 * 
 * accepts filter by 'id' or 'name'.
 * ---------------------------------------*/

const GenreModel = require('../models/Genre');

const moviesGenresController = (req, res, next) => {

  let filter = {};

  if (req.query.id)
    filter._id = req.query.id;

  else if (req.query.name)
    filter.name = new RegExp(`\\b${req.query.name}\\b`, 'i');

  GenreModel.find(filter)
    .then(items => (items[0])? res.status(200).json(items):next())
    .catch(err => {
      res.status(500).json({ message: `genres error: ${err}` });
    });
};

module.exports = moviesGenresController;
