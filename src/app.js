const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const acl = require('express-acl');
const routes = require('./routes');
const database = require('./config/database');
const jwt = require('./middleware/auth.js');

const app = express();
acl.config({ baseUrl: '/', path: 'config' });

const configureExpress = () => {
  app.use(cors());
  app.use(helmet());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  // app.use(acl.authorize.unless({ path: ['/users/authenticate'] }));
  app.use(jwt);
  app.use('/', routes);

  return app;
};

module.exports = () => database().then(configureExpress);
