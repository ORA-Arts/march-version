const mongoose = require('mongoose');
const User = require('../models/User.model');
const bcrypt = require('bcrypt')


const DB_NAME = 'march-version'

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const admin = [
  {
    email: 'corentine.piette@ora-arts.com',
    password: '123456seven'
  },
  {
    email: 'ptrcklehmann@gmail.com',
    password: '123456seven'
  }
]
const salt = bcrypt.genSaltSync();
admin.forEach(user => {
    user.password = bcrypt.hashSync(user.password, salt)
})

User.create(admin)
    .then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} admin accounts`);
    mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating admin accounts on the DB: ${err}`));