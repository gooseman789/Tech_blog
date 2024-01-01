const router = require('express').Router()
const { Post, Comment, User } = require('../models')

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [User],
        })
    } catch (err) {
        res.status(500).json
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postsData = await Post.findByPk(req.params.id, {
            include: [
                User, 
                {
                    model: Comment, 
                    include: [User]
                }
            ]
        });
        if (postsData) {
            const post = postsData.get({ plain: true})
            res.render('single', { post })
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('login')
})

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }   res.render('signup')
})

module.exports = router