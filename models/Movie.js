const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
  type: Number,
  popularity: Number,
  vote_count: Number,
  video: Boolean,
  poster_path: String,
  id: {
    type: Number,
    unique: true,
    required: true
  },
  adult: Boolean,
  backdrop_path: String,
  original_language: String,
  original_title: String,
  genre_ids: Array,
  title: String,
  vote_average: Number,
  overview: String,
  release_date: String,
});

const MovieModel = mongoose.model('movie', MovieSchema);

module.exports = MovieModel;
