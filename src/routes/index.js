const express = require('express');
const usuariosRoute = require('./users');
const houseRoute = require('./house');

const router = express.Router();

const authMiddleware = require('../middleware/auth.js');

router.use('/users', usuariosRoute);
router.use('/house', houseRoute);
router.get('/', (req, res) => res.send('App Online!'));

module.exports = router;
