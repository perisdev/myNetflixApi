const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
  _id: false,
  name: String,
  deliverDays: Number
});

const CityModel = mongoose.model('city', CitySchema);

module.exports = CityModel;
