const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  inscriptionDate: { type: Date, default: Date.now },
});

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

module.exports = User;
