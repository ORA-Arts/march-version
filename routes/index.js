const router = require("express").Router();

// GET HomePage
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET What Is Ora
router.get('/what-is-ora', (req, res, next) => {
  res.render('about');
});

// GET Artist Open Call
router.get('/artist-open-call', (req, res, next) => {
  res.render('artist');
});

// GET Collector Space
router.get('/collector-space', (req, res, next) => {
  res.render('collector');
});

// GET Support An Artist Project
router.get('/support-an-artist-project', (req, res, next) => {
  res.render('support/index');
});

// GET Support An Artist Project Child Page
router.get('/support-an-artist-project/miles-greenberg', (req, res, next) => {
  res.render('support/greenberg');
});

// GET Contact Us
router.get('/contact-us', (req, res, next) => {
  res.render('contact');
});

// GET Privacy Policy
router.get('/privacy-policy', (req, res, next) => {
  res.render('privacy');
});



module.exports = router;


