const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  email: String,
  level: Number,
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

});

UserSchema.methods.toJSON = function (params) {
  const user = this._doc;
  delete user.token;
  delete user.password;
  delete user.__v;
  return user;
};

UserSchema.methods.comparePassword = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password)
};

/**
 * mongoose middleware that runs before saving ()
 * We use the ES5 functions because we need 'this'.
 * ------------------------------------------------------*/
UserSchema.pre('save', async function (next) {
  const user = this;

  if (user.password.length < 60) {
    
    await bcrypt.hash(user.password, 10)
      .then(hash => user.password = hash)
      .catch(error => {
        return res.status(500).send(error);
      })
  }

  next(); // need next() to pass to save()
})

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
