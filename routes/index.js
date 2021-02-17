const Newsletter = require("../models/Newsletter.model");
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
const validator = require("email-validator");
require("dotenv").config();
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

// // GET Support An Artist Project Child Page
// router.get('/support-an-artist-project/miles-greenberg', (req, res, next) => {
//   res.render('support/greenberg');
// });

// GET Contact Us
router.get('/contact-us', (req, res, next) => {
  res.render('contact');
});

// GET Privacy Policy
router.get('/privacy-policy', (req, res, next) => {
  res.render('privacy');
});

//POST Layout Newsletter
router.post('/', (req,res,next) => {
  const email = req.body.email
  Newsletter.findOne({
    email: email
  })
  .then(found => {
    if (found !== null) {
      console.log('already there')
      res.render('index', {header: 'THANKS AGAIN BUT', message:'WE ALREADY HAVE YOUR EMAIL'});
    }
    else {
      Newsletter.create({
        email: email
      })
      .then(email => {
        console.log('this email was added to the DB', email)
        res.render('index', {header: 'THANKS', message:'YOUR EMAIL WAS ADDED TO THE NEWSLETTER'});
      })
    }
  })
})


// Contact Form 
//https://lo-victoria.com/how-to-build-a-contact-form-with-javascript-and-nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.live.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

router.post("/contact-us", (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //2. You can configure the object however you want
    const mail = {
      from: data.name,
      sender: data.email,
      replyTo: data.email,
      to: process.env.EMAIL,
      subject: data.object,
      text: `${data.name} <${data.email}> \n${data.body}`,
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
         res.status(500).send("Something went wrong.");
      } else {
        console.log("Email successfully sent to recipient!");
      }
    });
  });
});
  
module.exports = router;


