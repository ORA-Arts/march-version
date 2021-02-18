const router = require("express").Router()
const Editorial = require('../models/Editorial.model')
const { uploader, cloudinary } = require('../config/cloudinary')
const User = require("../models/User.model")

const loginCheck = () => {
    return (req, res, next) => {
      (req.isAuthenticated()) ? next() : res.redirect('/');
    }
}

// Editorial routes and CRUD functionalites
// GET editorial
router.get('/editorial', (req, res, next) => {
    
    Editorial.find()
        .then(posts => {
            // focusPost = posts.map(post => post.inFocus == true)
            console.log(posts)
            const focusPost = [];
            posts.forEach(post => {
                if (post.inFocus == true) {
                    console.log(post.inFocus)
                    focusPost.push(post)
                }
            })
            console.log(focusPost)
            res.render('editorial', { posts, focusPost })
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
router.post('/:id/edit', uploader.single('photo'), async (req, res, next) => {
    const { title, category, subtitle, text, author } = req.body;
    try {
        let post = await Editorial.findById(req.params.id);
        await cloudinary.uploader.destroy(post.publicId); 
        const postData = {
            title: title,
            category: category,
            subtitle: subtitle,
            text: text,
            author: author,
            inFocus: (req.body.inFocus) ? true : false,
            imgName: (req.file != undefined) ? req.file.originalname : post.imgName,
            imgPath: (req.file != undefined) ? req.file.path : post.imgPath,
            publicId: (req.file != undefined) ? req.file.filename : post.publicId
        } 
        post = await Editorial.findByIdAndUpdate(req.params.id, postData, { new: true })
            res.redirect('/editorial')
        }
        catch(err) {
            console.log(err)
        }
    })

// Detele post
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