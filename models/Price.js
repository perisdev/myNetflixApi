const mongoose = require('mongoose');

const PriceSchema = mongoose.Schema({
  _id: Number,
  price: Number
});

const PriceModel = mongoose.model('price', PriceSchema);

module.exports = PriceModel;
