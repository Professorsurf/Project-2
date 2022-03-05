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

// ROUTES
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

app.post('/users/results', async (req, res) => {
    const [stock, created] = await db.stock.findOrCreate({
        where: { symbol:req.body.symbol},
        defaults: { high:req.body.high, low:req.body.low, volume:req.body.volume}
    })
        res.locals.user.addStock(stock)
    res.redirect('/users/search')
})


// newUser.userName = req.body.userName

// FAVES

// app.get('/users/faves', async (req, res) => {
//     res.send('show me some faves')
//     // try {
//     //     const allFaves = await db.fave.findAll()
//     //     res.json(allFaves)
//     // } catch (err) {
//     //     console.log(err)
//     // }
// })

// app.post('/users/faves', async (req, res) => {
//     // console.log(req.body)
//     // db.fave.create
//     try {
//         await db.fave.create({
//             stocks: req.body.allFaves,
//         })
//         res.redirect('/users/faves')
//     } catch (error) {
//         console.log(error)
//     }
// })

router.delete("/:stock_id/comments", async (req,res ) => {
    try {
      const removeComment = await db.comment.findOne({
        where: { 
            id: req.params.id
        }
      });
      await removeComment.destroy();
      res.redirect("/users/result/Comment.ejs");
    } catch (err) {
      console.log(err);
    }
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`You are listening to PORT ${PORT}`)
})