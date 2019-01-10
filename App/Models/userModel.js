const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  inscriptionDate: { type: Date, default: Date.now },
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSynch(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

module.exports = User;
