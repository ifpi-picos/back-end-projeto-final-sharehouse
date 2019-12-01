/**
 * Modules
 */
const path       = require('path');
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const helmet     = require('helmet');
const app        = express();
/**
 * MongoDB
 */
require('./config/database');

/**
 * Router
 */
const router = {
  api: require('@router/api'),
  web: require('@router/web'),
}

/**
 * Middleware
 */
const authorize = require('@middleware/authorize');

/**
 * app
 */
app.use(cors());
app.use(helmet());
app.use(helmet.xssFilter()); // kill hackers
app.use(helmet.noSniff()); // idk
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(authorize); // Verify token
app.set('views', __dirname + '/views');
// app.set('layout', __dirname + '/views/layouts/normal');
app.set('view engine', 'ejs');
/**
 * Public Assets
 */
app.use(express.static('public'));

// Group
app.use('/', router.web);
app.use('/api', router.api);

module.exports = app;
