/* eslint-disable import/no-dynamic-require */
const Config = require(`./env/${(process.env.NODE_ENV || 'development')}.js`);

module.exports = Config;
