const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

let app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});


// "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD?x-ba-key=NTY5ZWM5MzZhMzk4NDVjMGIxMjFmNTZiYjdhN2Y1Njc"
app.post("/", function(req,res){
    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",   
        qs: {
            from: req.body.crypto,
            to: req.body.fiat,
            amount: 1,
        },     
        
        headers : {
           'x-ba-key': 'NTY5ZWM5MzZhMzk4NDVjMGIxMjFmNTZiYjdhN2Y1Njc' 
        }
    }
    request(options, function(error,response,body){
        console.log(body);
    });
});

app.listen(3000, function(){
    console.log("Server is listening at port 3000");
})