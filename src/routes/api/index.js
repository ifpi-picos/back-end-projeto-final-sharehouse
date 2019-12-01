/**
 * Modules
 */
const express = require('express');
const router  = express.Router();

/**
 * Children
 */
const children = {
    users: require('@router/api/users'),
    house: require('@router/api/house'),
};

/**
 * Path's
 * @param path, handler
 */
router.use('/users', children.users);
router.use('/house', children.house);

module.exports = router;