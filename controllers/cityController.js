const CityModel = require('../models/City');

const cityController = (req, res, next) => {

  let filter = {};

  if (req.query.name)
    filter.name = new RegExp(`\\b${req.query.name}\\b`, 'i');

  CityModel.find(filter)
    .then(items => (items[0])? res.status(200).json(items):next())
    .catch(err => {
      res.status(500).json({ message: `city error: ${err}` });
    });
};

module.exports = cityController;