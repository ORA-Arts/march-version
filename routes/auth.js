const router = require("express").Router()
const User = require('../models/User.model')
const bcrypt = require('bcrypt')

// GET login
router.get('/login', (req, res, next) => {
    res.render('auth/login')
});

// POST login
router.post('/login', (req, res) => {
    const { email, password } = req.body
    // check if we have a user with the entered username
    User.findOne({ email: email })
      .then(userFromDB => {
        if (userFromDB === null) {
          // if not we show login again
          res.render('login', { message: 'Invalid credentials' })
          return;
        }
        // if username is existing then we want to check the password
        if (bcrypt.compareSync(password, userFromDB.password)) {
          // password and hash match
          // now we want to log the user in
          req.session.user = userFromDB
          res.redirect('editorial/index')
        } else {
          res.render('login', { message: 'Invalid credentials' })
        }
      })
})

// GET logout
router.get('/logout', (req, res) => {
    // logout() is a passport function
    req.logout();
    res.redirect('/')
  })

module.exports = router

