const express = require('express') 
const app = express() 
const ejsLayouts = require('express-ejs-layouts') 
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js')
const db = require('./models')
const axios = require('axios')
const router = require('./controllers/users.js')
const { all } = require('./controllers/users.js')
// const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(cookieParser()) 
app.use(express.urlencoded({extended: false})) 
app.use(async (req, res, next)=>{
    if(req.cookies.userId){
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        const user = await db.user.findByPk(decryptedIdString)
        res.locals.user = user
    } else res.locals.user = null
    next() 
})

// CONTROLLERS
app.use('/users', require('./controllers/users.js'))

// ROUTES SEARCH/FAVE/COMMENTS
app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.get('/users/search', (req, res)=>{
    res.render('users/search.ejs')
})

app.get('/users/results', (req, res) => {
    console.log(req.query.stockSearch)
    let url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.query.stockSearch}&apikey=${process.env.Alphavantage_API_KEY}`;
    const options = {
    headers: {
        'User-Agent': 'request',
        'Accept': 'application/json'
        }
    } 
    axios.get(url, options)
    .then(response => {
    console.log(response.data)
    res.render('users/results.ejs', {stocks: response.data["Global Quote"]})
    })
})

// POST faves 
app.post('/users/results', async (req, res) => {
    const foundUser = await db.user.findOne({
        where: {id: res.locals.user.id}
    })
    const [stock, created] = await db.stock.findOrCreate({
        where: { symbol:req.body.symbol},
        defaults: { high:req.body.high, low:req.body.low, volume:req.body.volume}
    })
        foundUser.addStock(stock)
        res.redirect('/users/results')
})

// app.use(methodOverride('_method'))

app.post('/users/results', async (req, res) => {
    let userId = res.locals.user.id
    let stockId = req.params.stock_id
    // console.log(req.params)
    await db.comment.findOrCreate({
    where: {
        userId: userId,
        }
    })
    let newComment = req.body.comment
        db.comment.create({
        comment: newComment,
        userId: userId,
        stockId: stockId
    })
})

//displaying the comments [need to show the display on faves.ejs]
app.get('/:stock_id/comments', async (req, res) => {
    try {
        const foundComment = await db.comment.findAll({
            where: {
                stockId: req.params.stock_id
            }
        })
        // console.log("This is your comment to favorite stock")
        res.render('results/stockComment.ejs', {comment: foundComment})
    } catch (error) {
        console.log(error)
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`You are listening to PORT ${PORT}`)
})