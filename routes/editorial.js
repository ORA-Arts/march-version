const router = require("express").Router();
const Editorial = require('../models/Editorial.model')
// add edit delete view Editorial view
router.get('/editorial', (req, res, next) => {
    res.render('editorial')
});
module.exports = router;

