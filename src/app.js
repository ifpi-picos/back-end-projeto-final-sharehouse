/**
 * Modules
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

/**
 * Router
 */
const routes = require('./routes');

/**
 * Database Connection
 */
const database = require('./config/database');

/**
 * Middleware
 */
const authorize = require('./middleware/authorize');

/**
 * Initialize Express
 */
const app = express();

const configureExpress = () => {
  app.use(cors());

  app.use(helmet());
  app.use(helmet.xssFilter()); // kill hackers
  app.use(helmet.noSniff()); // idk
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(authorize); // Verify token

  app.use('/', routes); // Set routers [path: /]

  return app;
};

module.exports = () => database().then(configureExpress);
