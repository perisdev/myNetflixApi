const mongoose = require('mongoose');

const GenreSchema = mongoose.Schema({
  _id: Number,
  name: String
});

const GenreModel = mongoose.model('genre', GenreSchema);

module.exports = GenreModel;
