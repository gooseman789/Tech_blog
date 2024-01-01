const router = require('express').Router()
const { Post } = require("../models")
const withAuth = require("../utils/auth")

router.get('/', withAuth, async (req,res) => {
    try {
        const postsData = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        })
        const posts = postsData.map((post) => post.get({plain:true}))
        res.render('allPosts', {
            layout: 'dashboard',
            post, 
        })
    } catch (err) {
        res.redirect('login')
    }
})

router.get('/new', withAuth, (req, res) => {
    res.render('new', {
        layout: 'dashboard'
    })
})

router.get('/edit/:id', withAuth, async (req,res) => {
    try {
        const postsData = await Post.findByPk(req.params.id)
        if (postsData) {
            const post = postsData.get({plain: true})
            res.render('edit', {
                layout: 'dashboard',
                post,          
          })
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.redirect('login')
    }
}) 

module.exports = router