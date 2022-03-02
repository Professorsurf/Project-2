const express = require('express') // import express
const app = express() // create an express instance
const ejsLayouts = require('express-ejs-layouts') // import ejs layouts
require('dotenv').config() // allows us to access env vars
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js')
const db = require('./models/index.js')
const axios = require('axios')

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
const request = require('request');
const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${process.env.Alphavantage_API_KEY}';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
    if (err) {
        console.log('Error:', err);
    } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
    } else {
        console.log("5",data["Global Quote"])
    }
});




// check for an env PORT, otherwise use 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`You are listening to PORT ${PORT}`)
})