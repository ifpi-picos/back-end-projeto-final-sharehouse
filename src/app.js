/**
 * Modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const database = require('./config/database');
const apiRouter = require('./routes/api');

const app = express();
/**
 * MongoDB
 */

/**
 * Middleware
 */
const authorize = require('./middlewares/authorize');

/**
 * app
 */
const configureExpress = () => {
  app.use(cors());
  app.use(helmet());
  app.use(helmet.xssFilter()); // kill hackers
  app.use(helmet.noSniff()); // idk
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(authorize);

  // Group
  app.use('/', apiRouter);

  return app;
};

module.exports = () => database.connect().then(configureExpress);
