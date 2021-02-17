const router = require("express").Router();
const Editorial = require('../models/Editorial.model')
// add edit delete view Editorial view
// GET editorial
router.get('/editorial', (req, res, next) => {
    res.render('editorial', { whiteNav: 'whiteNav'})
});


module.exports = router;

