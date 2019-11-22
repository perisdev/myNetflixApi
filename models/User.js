const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  token: String,

  // current order
  order: {
    movieId: Number,
    dateRent: Date,
    dateArrival: Date,
    daysRent: Number,
    price: Number
  },

  // historic of orders
  orders: [{
    _id: false,
    movieId: Number,
    dateRent: Date,
    daysRent: Number,
    price: Number
  }]

}, { versionkey: false });

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
