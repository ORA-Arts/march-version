const router = require("express").Router();
const Editorial = require('../models/Editorial.model')
const { uploader, cloudinary } = require('../config/cloudinary');
const { findById } = require("../models/Editorial.model");
// add edit delete view Editorial view
// GET editorial

router.get('/editorial', (req, res, next) => {
    Editorial.find()
        .then(posts => {
            res.render('editorial', { posts })
        })
        .catch(err => {
            console.log('error fetching editorial posts')
            next(err)
        })
})

router.get('/editorial/new', (req, res, next) => {
    res.render('editorial/new')
})

router.post('/editorial/new', uploader.single('photo'), (req, res, next) => {
    console.log(req.file)
    const { title, category, subtitle, text, author } = req.body
    const inFocus = (req.body.inFocus === 'true') ? true : false
    const imgName = req.file.originalname
    const imgPath = req.file.path
    const publicId = req.file.filename
    Editorial.create({ title, category, subtitle, text, imgName, imgPath, inFocus, publicId, author })
        .then(post => {
            console.log(post)
            res.redirect('/editorial')
        })
        .catch(error => {
            next(error)
        })
})

router.get('/:id/edit', (req, res, next) => {
    Editorial.findById(req.params.id)
        .then(post => {
            res.render('editorial/edit', { post })
        })
        .catch(err => {
            next(err)
        });
})

router.put('/:id/edit', uploader.single('photo'), (req, res, next) => {
    
    console.log(req.body);
    let post = Editorial.findById(req.params.id)
    cloudinary.uploader.destroy(post.publicId)

    const { title, category, subtitle, text, author } = req.body
    const inFocus = (req.body.inFocus === 'true') ? true : false
    const imgName = () => {
        if (req.file.originalname != null) {
        cloudinary.uploader.destroy(post.publicId)
        return req.file.originalname
        } 
        else return prevPost.imgName
    }
    const postData = {
        title: title,
        category: category, 
        subtitle: subtitle, 
        text: text, 
        author: author, 
        inFocus: inFocus, 
        imgName: imgName, imgPath: imgPath, publicId: publicId
    }
    const imgPath = (req.file.path) ? req.file.path : prevPost.imgPath
    const publicId = (req.file.filename) ? req.file.filename : prevPost.publicId
    Editorial.findByIdAndUpdate(req.params.id, postData, {new: true})
    .then(() => {
      res.redirect('/editorial');
    })
    .catch(err => {
      next(err);
    });
})

router.get('/editorial/:id/delete/', (req, res, next) => {
    Editorial.findByIdAndDelete(req.params.id)
        .then(post => {
            (post.imgPath) && cloudinary.uploader.destroy(post.publicId)
            res.redirect('/editorial')
        })
        .catch(err => {
            next(err)
        })
})
router.get('/view/:id', (req, res, next) => {
    const postId = req.params.id
    Editorial.findById(postId)
      .then(post => {
          console.log(post.imgPath)
          res.render('editorial/read', { post });
      })
      .catch(err => {
        next(err);
      });
});
  


module.exports = router;