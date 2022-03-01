



'use strict';
var request = require('request');
var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=BXXIVDUR8Q2XYJD8';

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
        console.log(data);
    }
});



// {
//     "development": {
//       "databases": {
//           "Database1": {
//               "database": "sf-auth",
//               "host": "127.0.0.1",
//               "dialect": "postgres"  
//           },
//           "Database2": {
//             "database": "stocks",
//             "host": "127.0.0.1",
//             "dialect": "postgres"  
//           },
//           "Database3": {
//             "database": "userFaves",
//             "host": "127.0.0.1",
//             "dialect": "postgres"  
//           }
//         }
//       }
//     }