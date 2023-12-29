const router = require('express').Router()

const commentRoute = require('./comments.js')
const postRoute = require('./posts.js')
const userRoute = require('./user.js')

router.use('/comment', commentRoute)
router.use('/post', postRoute)
router.use('/user', userRoute)

module.exports = router
