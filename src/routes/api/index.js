/**
 * Modules
 */
const express = require('express');

const router = express.Router();

const users = require('../../routes/api/users');
const house = require('../../routes/api/house');

/**
 * Path's
 * @param path, handler
 */
router.use('/users', users);
router.use('/house', house);
router.get('/', (req, res) => {
  res.send('Api rodando');
});

module.exports = router;
