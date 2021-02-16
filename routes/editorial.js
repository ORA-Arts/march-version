const router = require("express").Router();

// add edit delete view Editorial view
router.get('/editorial', (req, res, next) => {
    res.render('editorial')
});
module.exports = router;

