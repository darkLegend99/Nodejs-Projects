const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

let app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

// var options = {
//   method: 'GET',
//   url: 'https://currencyapi-net.p.rapidapi.com/convert',
//   params: {from: 'BTC', to: 'USD', amount: '1', output: 'JSON'},
//   headers: {'x-rapidapi-host': 'currencyapi-net.p.rapidapi.com',
//   "x-rapidapi-key": ""}
// };




app.post("/", function(req,res){    

    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalUrl = baseUrl+crypto+fiat;
    request(finalUrl, function(error,response,body){
        // console.log(body);
        var data = JSON.parse(body);
        // console.log(data);
        var price = data.last; 
        console.log(price);

        var currentDate = data.display_timestamp;
        res.write("<p>The current date is: "+ currentDate + "</p>");
        res.write("<h1>The current price of " + crypto + " is " + price + fiat+ " USD</h1>");

        res.send();
    });
});

app.listen(3000, function(){
    console.log("Server is listening at port 3000");
})