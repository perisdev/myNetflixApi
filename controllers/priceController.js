/** 
 * responds with all prices collection.
 * 
 * accepts filter by 'type'.
 * -------------------------------------*/

const PriceModel = require('../models/Price');

const priceController = (req, res, next) => {

  let filter = {}

  if (req.query.type)
    filter._id = Number(req.query.type);

  PriceModel.find(filter)
    .then(items => (items[0])? res.status(200).json(items):next())
    .catch(err => {
      res.status(500).json({ message: `price error: ${err}` });
    });
};

module.exports = priceController;