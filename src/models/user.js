const mongoose = require('mongoose');
const Util = require('util');
const bcrypt = require('bcrypt');

const hash = Util.promisify(bcrypt.hash);
const schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  sexo: String,
  address: String,
  urlUser: String,
  role: String,
});

// eslint-disable-next-line consistent-return
// eslint-disable-next-line func-names
// eslint-disable-next-line consistent-return
schema.pre('save', function (next) {
  if (!this.password || !this.isModified('password')) {
    return next();
  }
  hash(this.password, 10)
    .then((doc) => {
      this.password = doc;
      next();
    });
});

const User = mongoose.model('User', schema);


module.exports = User;
