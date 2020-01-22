/* eslint-disable import/no-unresolved */
const jwt = require('jsonwebtoken');
const auth = require('../config/auth.json');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log('cheguei', token);
  jwt.verify(token, auth.key, (err, decoded) => {
    req.decoded = decoded;
    return next();
  });
};
