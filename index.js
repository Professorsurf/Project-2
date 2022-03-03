const express = require('express') // import express
const app = express() // create an express instance
const ejsLayouts = require('express-ejs-layouts') // import ejs layouts
require('dotenv').config() // allows us to access env vars
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js')
const db = require('./models/index.js')

// MIDDLEWARE
app.set('view engine', 'ejs') // set the view engine to ejs
app.use(ejsLayouts) // tell express we want to use layouts
app.use(cookieParser()) // gives us access to req.cookies
app.use(express.urlencoded({extended: false})) // body parser (to make req.body work)

// CUSTOM LOGIN MIDDLEWARE
app.use(async (req, res, next)=>{
    if(req.cookies.userId){
        // decrypting the incoming user id from the cookie
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        // converting the decrypted id into a readable string
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        // querying the db for the user with that id
        const user = await db.user.findByPk(decryptedIdString)
        // assigning the found user to res.locals.user in the routes, and user in the ejs
        res.locals.user = user
    } else res.locals.user = null
    next() // move on to next middleware
})

// CONTROLLERS
app.use('/users', require('./controllers/users.js'))

// ROUTES
app.get('/', (req, res)=>{
    res.render('home.ejs')
})

'use strict';
const { default: axios } = require('axios');
const request = require('axios');
const router = require('./controllers/users');
const { response } = require('express')
require('dotenv').config()

// router.get('/users/profile', (req, res) => {
//     console.log(req.query.stockSearch)
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOG&apikey=${process.env.Alphavantage_API_KEY}`;
    const options = {
    headers: {
        'User-Agent': 'request',
        'Accept': 'application/json'
        }
    } 
    axios.get(url, options)
    .then(response => {
    // console.log(response.data)
    console.log("bracket",response.data["Global Quote"])
    // res.render('users/results.ejs', {stockSearch: response.data["Global Quote"]})
    })
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`You are listening to PORT ${PORT}`)
})