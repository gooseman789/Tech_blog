const express = require('express')
const session = require('express-session')
const path = require('path')
const exphbs = require('express-handlebars')
const routes = require('./controllers')

const app = express()
const PORT = process.env.PORT || 3001

const sequelize = require('./config/config')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false, 
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))
const hbs = exphbs.create({ helpers })

app.engine('handelbars', hbs.engine)
app.set('views engine', 'handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./controllers'))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
    sequelize.sync({ force: false })
})