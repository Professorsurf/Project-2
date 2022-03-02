
'use strict';
const { default: axios } = require('axios');
var request = require('axios');
const router = require('./controllers/users');
require('dotenv').config()



// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${process.env.Alphavantage_API_KEY}`;
const options = {
    headers: {
      'User-Agent': 'request',
      'Accept': 'application/json'
    }
  } 

axios.get(url, options)
.then(response => {
    console.log(response.data)
})

// 'use strict'; 

// const request = require('request');
// const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${process.env.Alphavantage_API_KEY}`;

// request.get({
//     url: url,
//     json: true,
//     headers: {'User-Agent': 'request'}
//     }, (err, res, data) => {
//     if (err) {
//         console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//         console.log('Status:', res.statusCode);
//     } else {
//         console.log("bracket",data["Global Quote"])
//     }
// });
// request.get({
//     url: url,
//     json: true,
//     headers: {'User-Agent': 'request'}
//   }, (err, res, data) => {
//     if (err) {
//       console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//       console.log('Status:', res.statusCode);
//     } else {
//       // data is successfully parsed as a JSON object:
//       console.log(data);
//     }
// });


// 'use strict';
// var request = require('request');
// var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=';

// request.get({
//     url: url,
//     json: true,
//     headers: {'User-Agent': 'request'}
//     }, (err, res, data) => {
//     if (err) {
//         console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//         console.log('Status:', res.statusCode);
//     } else {
//         console.log(data);
//     }
// });

