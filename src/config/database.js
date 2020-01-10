const mongoose = require('mongoose');
const config = require('./config');

mongoose.Promise = Promise;

const configuracoes = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 3000,
  useFindAndModify: false,
};
exports.connect = () => mongoose.connect(config.MONGODB_URL, configuracoes);
