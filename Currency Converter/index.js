const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

let app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});


// var crypto = require('crypto-js');

app.post("/", function(req,res){  

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;
    
    var public_key = '';
    // var ticker_btcusd_url = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD';
    var ticker_url = 'https://apiv2.bitcoinaverage.com/convert/global';

    var options = {
    url: ticker_url,
    method: "GET",
    // params: {from: crypto, to: fiat, amount: 1, output: 'JSON'},
    qs: {from: crypto, to: fiat, amount: amount}, 
        headers: {
            "Content-Type": "application/json",
            "x-ba-key": public_key,
        }
    };

    
    request(options, function(error, response, body) {
        console.log(body);
        // console.log(typeof(body));
        
        var data = JSON.parse(body);
        var price = data.price;
        console.log(price);

        var currentDate = data.time;
        res.write("<p>The current date is: "+ currentDate + "</p>");
        res.write("<h1>The current price of " + amount + crypto + " is " + price + fiat+ " USD</h1>");

        res.send();
    });
});

app.listen(3000, function(){
    console.log("Server is listening at port 3000");
});








//     try{
//     var crypto = req.body.crypto;
//     var fiat = req.body.fiat;
//     var baseURL="https://apiv2.bitcoinaverage.com/indices/global/ticker/";
//     var finalUrl = baseUrl+crypto+fiat;
//     request(finalUrl, function(error,response,body){
//         // console.log(body);
//         var data = JSON.parse(body);
//         // console.log(data);
//         var price = data.last; 
//         console.log(price);

//         var currentDate = data.display_timestamp;
//         res.write("<p>The current date is: "+ currentDate + "</p>");
//         res.write("<h1>The current price of " + crypto + " is " + price + fiat+ " USD</h1>");

//         res.send();
//     });
// }
// catch(err){
//     console.log(err);
// }
// });