/* eslint-disable import/no-dynamic-require */
const Config = require(`./env/${(process.env.NODE_ENV || 'production')}.js`);

module.exports = Config;
