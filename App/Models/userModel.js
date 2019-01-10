const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  inscriptionDate: { type: Date, default: Date.now },
  watchlist: [{type: Schema.Types.ObjectId, ref: 'Movie'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
