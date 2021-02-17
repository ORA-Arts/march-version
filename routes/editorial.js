const router = require("express").Router()
const Editorial = require('../models/Editorial.model')
const { uploader, cloudinary } = require('../config/cloudinary')

// Editorial routes and CRUD functionalites
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

router.get('/editorial/new', loginCheck(), (req, res, next) => {
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

router.get('/:id/edit', loginCheck(), (req, res, next) => {
    Editorial.findById(req.params.id)
        .then(post => {
            res.render('editorial/edit', { post })
        })
        .catch(err => {
            next(err)
        });
})

//Edit post
router.post('/:id/edit', uploader.single('photo'), (req, res, next) => {
    //retrieve the current editing post to make use of picture params
    let prevPost = Editorial.findById(req.params.id)

    const { title, category, subtitle, text, author } = req.body
    const imgName = () => {
        if (req.file.originalname != null) {
            cloudinary.uploader.destroy(post.publicId)
            return req.file.originalname
        }
        return prevPost.imgName
    }
    const postData = {
        title: title,
<<<<<<< HEAD
        category: category,
        subtitle: subtitle,
        text: text,
        author: author,
        inFocus: (req.body.inFocus) ? true : false,
        imgName: imgName,
        imgPath: (req.file.path) ? req.file.path : prevPost.imgPath,
        publicId: (req.file.filename) ? req.file.filename : prevPost.publicId
    }
    Editorial.findByIdAndUpdate(req.params.id, postData, { new: true })
        .then(() => {
            res.redirect('/editorial')
        })
        .catch(err => {
            next(err)
        });
})

// Detele post
router.get('/editorial/:id/delete/', (req, res, next) => {
=======
        category: category, 
        subtitle: subtitle, 
        text: text, 
        author: author, 
        inFocus: inFocus, 
        imgName: imgName, 
        imgPath: (req.file.path) ? req.file.path : prevPost.imgPath, 
        publicId: (req.file.filename) ? req.file.filename : prevPost.publicId
    }
    Editorial.findByIdAndUpdate(req.params.id, postData, {new: true})
    .then(() => {
      res.redirect('/editorial');
    })
    .catch(err => {
      next(err);
    });
})

router.get('/editorial/:id/delete/', loginCheck(), (req, res, next) => {
>>>>>>> 781c7f42c6dadf7081f211c293c739c8db50d1f6
    Editorial.findByIdAndDelete(req.params.id)
        .then(post => {
            (post.imgPath) && cloudinary.uploader.destroy(post.publicId)
            res.redirect('/editorial')
        })
        .catch(err => {
            next(err)
        })
})

//view Post
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