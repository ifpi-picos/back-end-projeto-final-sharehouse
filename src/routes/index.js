const express = require('express');
const usuariosRoute = require('./users');
const houseRoute = require('./house');

const router = express.Router();

router.use('/users', usuariosRoute);
router.use('/house', houseRoute);
router.get('/', (req, res) => res.send('App Online!'));

module.exports = router;
