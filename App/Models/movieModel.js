const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const movieSchema = new Schema({
  vote_count: Number,
  video: Boolean,
  vote_average: Number,
  title: String,
  popularity: Number,
  poster_path: String,
  original_language: String,
  original_title: String,
  backdrop_path: String,
  adult: Boolean,
  overview: String,
  release_date: String,
  tmdb_id: Number,
  genres: [String],
});

movieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
