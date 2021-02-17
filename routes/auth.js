const router = require("express").Router()
const User = require('../models/User.model')
const bcrypt = require('bcrypt')
const passport = require('passport')


// GET login
router.get('/login', (req, res, next) => {
    res.render('auth/login')
});

// POST login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  passReqToCallback: true
}))

//(req, res) => {
//     const { email, password } = req.body
//     // check if we have a user with the entered username
//     User.findOne({ email: email })
//       .then(userFromDB => {
//         if (userFromDB === null) {
//           // if not we show login again
//           res.render('/', { message: 'Invalid credentials' })
//           return;
//         }
//         // if username is existing then we want to check the password
//         if (bcrypt.compareSync(password, userFromDB.password)) {
//           // password and hash match
//           // now we want to log the user in
//           console.log(userFromDB.email)
//           req.login(userFromDB, function(err) {
//             if (err) { return next(err) }
//             return res.redirect('/editorial')
//           })
//         } else {
//           res.render('/', { message: 'Invalid credentials' })
//         }
//       })
// })

// POST login
router.post('/signup', (req, res) => {
  // get username and password
  const { email, password } = req.body;
  console.log(email, password);
  // is the password longer than 8 chars and the username not empty
  if (password.length < 8) {
    // if not show the signup again with a message
    return res.render('signup', { message: 'Your password has to be 8 chars min' });

  }
  if (email === '') {
    res.render('signup', { message: 'Your username cannot be empty' });
    return
  }
  // check if the username already exists
  User.findOne({ email: email })
    .then(userFromDB => {
      if (userFromDB !== null) {
        // if yes show the signup again with a message
        res.render('signup', { message: 'Username is already taken' });
      } else {
        // all validation passed - > we can create a new user in the database with a hashed password
        // create salt and hash
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt)
        // create the user in the db
        User.create({ email: email, password: hash })
          .then(userFromDB => {
            console.log(userFromDB);
            // then redirect to login
            res.redirect('/');
          })
      }
    })
    .catch(err => {
      console.log(err);
    })
})
// GET logout
router.get('/logout', function(req, res){
  req.session.destroy
  req.logout()
  res.redirect('/')
})

module.exports = router

