const router = require('express').Router()

const commentRoute = require('./comments')
const postRoute = require('./posts')
const userRoute = require('./user')

router.use('/comment', commentRoute)
router.use('/post', postRoute)
router.use('/user', userRoute)

module.exports = router
