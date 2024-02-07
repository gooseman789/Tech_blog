const router = require('express').Router()
const { User } = require('../../models')

router.post('/', async (req,res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        req.session.save(() => {
            req.session.userId = newUser.id
            req.session.username = newUser.username
            req.session.loggedIn =  true
            res.json(newUser)
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req,res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (!user) {
            res.status(400).json({ message: 'No user account found!' })
            return
        }
        const validPass = user.checkPassword(req.body.password)
        if (!validPass) {
            res.status(400).json({ message: 'No user account found!'})
            return
        }
        try {
            await new Promise((resolve, reject) => {
                req.session.save((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            })
            req.session.save(() => {
                req.session.userId = user.id
                req.session.username = user.username
                req.session.loggedIn =  true
                res.json({user, message: 'You are now logged in!'})
            })
            console.log(req.session.userId, req.session.username, req.session.loggedIn )
        } catch (saveErr) {
            console.error("Error saving session: ", saveErr)
        }
    } catch (err) {
        res.status(400).json({ message: 'No user account found!'})
    }
})

router.post('/logout', (req,res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router