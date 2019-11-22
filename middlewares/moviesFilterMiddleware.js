/** 
 * builds filter movies by 'id' or 'title' or 'genre'
 * ------------------------------------------------*/

const GenreModel = require('../models/Genre');

const moviesFilterMiddleware = async (req, res, next) => {

  let filter = {};

  // id filter
  if (req.query.id)
    filter.id = req.query.id;

  // title filter
  else if (req.query.title)
    filter.title = new RegExp(`${req.query.title}`, 'i');

  // genre filter
  else if (req.query.genre) {
    let regexp = new RegExp(`\\b${req.query.genre}\\b`, 'i');

    await GenreModel.findOne({ name: regexp })
      .then(item => {
        if (item)
          filter.genre_ids = item._id;
      })
      .catch(err => {
        res.status(500).json({ message: `genre error: ${err}` });
        console.log(err)
      });
  }

  req.filter = filter;
  next();
};

module.exports = moviesFilterMiddleware;
