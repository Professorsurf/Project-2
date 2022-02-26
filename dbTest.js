var request = require('request');
var requestOptions = {
        'url': 'https://api.tiingo.com/api/test/',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': 'Token 0bb310a6a2128b6821ab844dc4a7ed550a5ed935'
            }
        };

request(requestOptions,
        function(error, response, body) {
            console.log(body);
        }
);

// document.addEventListener('DOMContentLoaded', ()=>{

// // MAKE FETCH HAPPEN  FOR DATA.NASDAQ.COM

// const endpoint = 'https://data.nasdaq.com/api/v3/datatables/ETFG/FUND.json?ticker=SPY&api_key=uZFShvkfq9wxcHfsEF8D'
// fetch(endpoint).then(fetchObj=>fetchObj.json()).then(jsonData=>{
//     console.log("Here is your Nasdaq sample data: \n", jsonData)
// })
// .catch(err=>console.log('Error fetching data:', err))

// console.log ('when will we see this')

// })