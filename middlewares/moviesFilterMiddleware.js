/** 
 * builds filter movies by 'id' and/or  'genre'
 * ------------------------------------------------*/

const GenreModel = require('../models/Genre');

const moviesFilterMiddleware = (req, res, next) => {

  const filter = {};

  // id filter
  if (req.query.id)
    filter.id = req.query.id;

  (async () => {
    // genre filter
    let regexp = new RegExp(`\\b${req.query.genre}\\b`, 'i');

    await GenreModel.findOne({ name: regexp })
      .then(item => {
        if (item)
          filter.genre_ids = item._id;
      })

    req.filter = filter;
    next();
  })();
};

module.exports = moviesFilterMiddleware;
