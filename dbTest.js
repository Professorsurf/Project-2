
'use strict';
var request = require('request');
var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=';

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
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});


// var yahooFinance = require('yahoo-finance');

// yahooFinance.historical({
//   symbol: 'AAPL',
//   from: '2012-01-01',
//   to: '2012-12-31',
//   // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
// }, function (err, quotes) {
//   //...
// });

// // This replaces the deprecated snapshot() API
// yahooFinance.quote({
//   symbol: 'AAPL',
//   modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
// }, function (err, quotes) {
//   // ...
// });



// RAPID API

// var axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
//   params: {symbol: 'AMRN', region: 'US'},
//   headers: {
//     'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
//     'x-rapidapi-key': 'c598bacb68msh2eac0357e70881ep15fcdcjsn6c2f28ba5520'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });




// Tiingo
// var request = require('request');
// var requestOptions = {
//         'url': 'https://api.tiingo.com/api/test/',
//         'headers': {
//             'Content-Type': 'application/json',
//             'Authorization': 'Token 0bb310a6a2128b6821ab844dc4a7ed550a5ed935'
//             }
//         };

// request(requestOptions,
//         function(error, response, body) {
//             console.log(body);
//         }
// );

// document.addEventListener('DOMContentLoaded', ()=>{



// // MAKE FETCH HAPPEN  FOR DATA.NASDAQ.COM

// const endpoint = 'https://data.nasdaq.com/api/v3/datatables/ETFG/FUND.json?ticker=SPY&api_key=uZFShvkfq9wxcHfsEF8D'
// fetch(endpoint).then(fetchObj=>fetchObj.json()).then(jsonData=>{
//     console.log("Here is your Nasdaq sample data: \n", jsonData)
// })
// .catch(err=>console.log('Error fetching data:', err))

// console.log ('when will we see this')

// })