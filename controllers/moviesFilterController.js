const MovieModel = require('../models/Movie');
const GenreModel = require('../models/Genre');

const moviesFilterController = (req, res) => {

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

    MovieModel.find(filter).then(items => res.status(200).send(items));
  })();
};

module.exports = moviesFilterController;
