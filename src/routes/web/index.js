const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
    res.render('home', {
        title: 'Share House • Anuncie seu imóvel!'
    });
});

module.exports = router;