const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  token: String
}, { versionkey: false });

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
