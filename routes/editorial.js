const router = require("express").Router();
const Editorial = require('../models/Editorial.model')
const { uploader, cloudinary } = require('../config/cloudinary');
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

router.post('/:id/edit', (req, res, next) => {
    console.log(req.body);
    const { title, category, subtitle, text, author } = req.body
    const inFocus = (req.body.inFocus === 'true') ? true : false
    const imgName = req.file.originalname
    const imgPath = req.file.path
    const publicId = req.file.filename
    Editorial.findByIdAndUpdate(req.params.id, { title: title, category: category, subtitle: subtitle, text: text, author: author, inFocus: inFocus, imgName: imgName, imgPath: imgPath, publicId: publicId })
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