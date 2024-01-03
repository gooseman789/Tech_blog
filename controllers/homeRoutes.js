const router = require('express').Router()
const { Post, Comment, User } = require('../models')

router.get('/', async (req, res) => {
    console.log("hello")
    try {
        const postsData = await Post.findAll({
            include: [User],
        })
        console.log(req.session)
        res.render('allPosts', { 
            layout: 'main',
            postsData })
    } catch (err) {
        res.status(500).json(err)
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

router.get('/login', (req, res) => {
    console.log("outside")
    if (req.session.loggedIn) {
        console.log("test1")
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