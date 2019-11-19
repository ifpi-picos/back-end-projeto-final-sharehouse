const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = Promise;
async function connect() {
  await mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
  });
}
module.exports = connect;
